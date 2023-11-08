# GIT

## 准备

### git 提交规范

```BASH
# 大致分为三个部分(使用空行分割)
# 1. 标题行:必填,描述主要修改类型和内容	
# 2. 主题内容:描述为什么修改,做了什么样的修改,以及开发的思路等等
# 3. 页脚注释:放 Breaking Changes或 Closed issues
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type: commit的类型

|    前缀    | 类型                            |
|:--------:|:------------------------------|
|   feat   | 新功能、新特性                       |
|   fix    | 修改bug                         |
|   perf   | 更改代码,以提高性能                    |
| refactor | 代码重构 (重构,在不影响代码内部行为、功能下的代码修改) |
|   docs   | 文档修改                          |
|  style   | 代码格式修改,注意不是css修改(例如分号修改)      |
|   test   | 测试用例新增、修改                     |
|  build   | 影响项目构建或依赖项修改                  |
|  evert   | 影响项目构建或依赖项修改                  |
|  build   | 影响项目构建或依赖项修改                  |
|  revert  | 恢复上一次提交                       |
|    ci    | 持续集成相关文件修改                    |
|  chore   | 其他修改(不在上述类型中的修改               |
| release  | 发布新版本                         |
| workflow | 工作流相关文件修改                     |

### 修改配置信息

```BASH
# 系统级别
git config --system

# 用户级别
git config --global

# 项目级别
git config --local

#  --unset 删除某一个变量 例如
git config --local --unset user.name

```

# 丢弃更改

> checkout 删除工作区最新的修改数据,已经 `git add .` 加入到暂存区的内容不会被删除
> 在工作区起作用,恢复到上一次的暂存区状态
>
>

## 丢弃工作区的文件

```BASH
# 丢弃单个文件的修改内容
git checkout -- <file>
git restore <file>
# 丢弃所有文件的修改内容
git checkout .

```

## 丢弃暂存区 的文件

```BASH
# git add <file> 之后 ,如果想从暂存区移出到工作区(修改内容仍保留),可以使用如下方法
git reset HEAD <file>
git restore <file>

```

### git 删除文件

```
# 移除文件,将文件移到暂存区,可用 恢复命令,恢复文件
git rm <file>

```

## git 修改提交信息

```
# 只能修改最近的一次提交信息
git commit --amend -m""

```

# .gitignore

```
# 忽略以test结尾的文件
*.test
#加 ! 取反, important.test 除外,不忽略
!important.test
# 忽略 根目录/子目录/test.txt
/*/test.txt
# 忽略 任意目录下的 test.txt
/**/test.txt

```

---

# 仓库

```bash
# 查看
git remote -vv
# 新增
git remote add [repository_name]  [repository_address]
# 删除

#修改
```

##  

# 分支

## 增/删/改/查

```bash
# =====================查看==========================
git branch -vv
# =====================创建==========================
# 创建本地分支
git checkout [new_branch_name]
# 创建并切换分支
git checkout -b [new_branch_name]
# =====================切换==========================
git checkout [branch_name]
# =====================删除==========================
# 当处在 本分支上时|有新的修改 不允许删除
git branch -d [branch_name] 
# =====================修改名称==========================
git branch -m [old_branch_name] [new_branch_name]
# 强制删除
git branch -D [branch_name] 
# 合并
git merge [branch_name]

# 绑定远程分支
git push origin/[remote_branch_name] [local_branch_name]
```

## HEAD

>
> HEAD实际上是一个指针,指向的是当前分支
> master 指向提交
> fast forward 快速前进 修改指针的指向
> 如果可能 ,合并分支时Git会使用fast-forward模式
> 在这种模式下删除分支会丢掉分支信息
> 合并时加上 —no-ff 参数 会禁用fast-forward,这样会多出一个commit id


---

## 版本回退

### 回退到上一个提交

+ git reset --hard HEAD^
+ git reset --hard HEAD~1
+ git reset --hard commit_id

> reset 从暂存区移开,退回到已修改状态

### 返回到某一个提交

+ git reflog

# commit

**1,查看到未传送到远程代码库的提交次数**

```bash
git status

# 显示结果类似于这样：
# On branch master
# Your branch is ahead of 'origin/master' by 2 commits.
```

**2,查看到未传送到远程代码库的提交描述/说明**

```
git cherry -v

显示结果类似于这样：
+ c988a11d0fe48980b77e2f6742a577869045a96f feat: 新增商户入驻模块
+ e03fc2b7281fc325204d447facfcd54c99ab6822 fix: 删除分类路由,修复文件导入报错问题
```

# stash

```bash
# 保存现场
git stash
git stash list
# 恢复现场
git stash apply #( stash内容并不删除,需要通过 git stash drop stash@{0}手动删除 )
git stash pop # ( 恢复的同时也将 stash内容删除 )
git stash apply stash@(0)
```

# Git标签

```bash
# 新建标签,标签有两种:轻量级标签(lightweight)与带有附注标签(annotated)

# 创建一个轻量级标签
git tag v1.0.1

# 创建一个带有附注的标签
git tag -a v1.0.2 -m'release version

# 删除标签
git tag -d [tag_name]
```

# blame

```bash
# 查看文件修改历史

git blame [file_name]
```

# diff

```bash
# 比较暂存区与工作区文件之间的区别
git diff
# 比较最新提交与工作区的差别
git diff HEAD
# 比较最新提交与暂存区的差别
git diff --cache
```

# 单词

```
# 合并冲突
merge conflict
# aborting 终止,流产  due to 由于
aborting commit due to empty commit message
repository 存储库
detached v拆卸 挣脱  adj单独的,冷漠的
HEAD detached ad commit_id

  stash
n. 藏匿处；藏匿物
vt. 存放；贮藏
vi. 存放；藏起来
 
blame 归咎于
```

# VIM 命令

```
# 查看当前目录
pwd
# 回到上一个目录
cd -
# 回到home 目录
cd ~

```

---

[gerrit](https://www.notion.so/gerrit-c92b534b42504bf2b33cea5a129ef79a)