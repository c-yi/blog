# 是什么

是一种轻量级、可执行的独立软件包，它包含运行某个软件所需的所有内容，我们把应用程序和配置依赖打包好形成一个可交付的
运行环境（包括代码、运行时需要的库、环境变量和配置文件等），这个打包好的运行环境就是image镜像文件。
只有通过这个镜像文件才能生成Docker?容器实 例（类似Java中new出来一个对象）。

## UnionFS(联合文件系统)

Union文件系统(UnionFS)是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作
为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtua
filesystem)。Union文件系统是Docker镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种
具体的应用镜像。

# 提交镜像到仓库

## 将容器打包成镜像

docker commit -m="备注信息" -a="作者" 容器ID 包名/镜像名:版本号

`docker commit -m="添加vim" -a="cy" 89efad73beeb dev/ubuntu:0.1`

## 发布到阿里云

```docker
# 登录阿里云
docker login --username=[userName] registry.cn-hangzhou.aliyuncs.com
# 使用"docker tag"命令重命名镜像，并将它通过专有网络地址推送至Registry
# 【注意】 重命名需要严格按照 `仓库地址/命名空间/仓库名称:版本号` 来命名，否则推送不上出
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/XXX-A/XXX-B:[镜像版本号]
# 推送到仓库
docker push registry.cn-hangzhou.aliyuncs.com/XXX-A/XXX-B:[镜像版本号]
```

## 拉取阿里云的镜像

```docker
# 【注意】 需要提供版本号否则会报错 因为默认的版本号是latest，在仓库中是找不到的,报错如下
# Error response from daemon: manifest for registry.cn-hangzhou.aliyuncs.com/XXX-A/XXX-B:latest not found: manifest unknown: manifest unknown
 docker pull registry.cn-hangzhou.aliyuncs.com/XXX-A/XXX-B:[镜像版本号]
```

# docker 发布到私有库

1. 下载镜像Docker Registry
   `docker pull registry`
2. 运行私有库Registry,相当于本地有个私有Docker hub 

   `docker run -d -p 5000:5000 -v /dockerHub/myRegistry/:/tmp/registry --privileged=true registry`
3. 案例演示创建一个新镜像，ubuntu安装 ifconfig 命令
   ```bash
   # 运行ubuntu
   docker run -it ubuntu
   # 更新安装器
   apt-get update
   # 安装net-tools
   apt-get install net-tools
   # 退出容器
   ctrl + p + q
   ```
4. curl验证私服库上有什么镜像
   ```bash
   # 通过ifconfig 查看宿主机地址，加上映射端口号
   curl XGET http://172.18.XXX.XXX:5000/v2/_catalog
   # 结果
   curl: (6) Could not resolve host: XGET
   {"repositories":[]}
   ```
5. 将新镜像修改符合私服规范的Tag 【注意符合规范】
   `docker tag [ImageId] 172.18.XXX.XXX:5000/XXX:[镜像版本号]`
6. 修改配置文件使之支持http `/etc/docker/daemon.json`
   > docker默认不允许http方式推送镜像，通过配置选项来取消这个限制。===>修改完后如果不生效，建议重启docker
   ```json
   {
   "registry-mirrors":["https://aa25ingu.mirror.aliyuncs.com"],
   "insecure-registries":["172.18XXX.XXX:5000"]
   }
   ```
   如果是用dockerDesktop 可以直接在设置->Docker Engine中配置,
7. push推送到私服库 `docker push 172.18.XXX.XXX:5000/ubuntu-with-net-tools:0.1`
8. curl 验证私服库上有什么镜像
   ```bash
   curl XGET http://172.18.XXX.XXX:5000/v2/_catalog
   curl: (6) Could not resolve host: XGET
   {"repositories":["ubuntu-with-net-tools"]}
   ```
9. pull 到本地并运行身
   ```bash
   # 查看tag版本号 
   curl XGET http://172.18.XXX.XXX:5000/v2/ubuntu-with-net-tools/tags/list
   docker pull 172.18.XXX.XXX:5000/v2/ubuntu-with-net-tools:0.1
   ```