const fs = require('fs');
const path = require('path');
const nav = require('./nva.json');

const readPwd = path.resolve(__dirname, '../../');
const writePwd = path.resolve(__dirname, './sideBar.js');


// 临时容器
let container = {}

/**
 * 获取文件目录
 * @param dir
 * @return {Promise<unknown>}
 */
const getDir = function (dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, data) => {
            err && reject(err)
            resolve(data)
        })
    })
};

async function generate(con) {
    const {type, childrenTitle, redDir} = con;
    let newPath = path.join(readPwd, redDir)
    let file = await getDir(newPath);
    let newChildren = file.map(item => {
        const isIndex = item === 'index.md' || item === 'README.md'
        const link = isIndex ? redDir : (redDir + item).replace('.md', '')
        let text = isIndex ? "README" : item.replace('.md', '');
        const res = item.match(/(?<=_).*?(?=.md)/)||item.match(/(?<=\d{2}).*?(?=.md)/)
        if (!isIndex && res) {
            text = res[0]
        }
        return {text, link}
    }).sort();
    // debugger
    // 存储到临时容器里面
    if (container.hasOwnProperty(type)) {
        let hasThis = container[type].map((item, index) => {
            if (item.title === childrenTitle) {
                return index
            } else {
                return false
            }
        })[0]
        //判断是否有子属性 , 有 替换 ,没有 添加
        if (hasThis === false) {
            container[type].push({'title': childrenTitle, 'items': newChildren})
        } else {
            container[type][hasThis]['items'] = newChildren
        }
    } else {
        container[type] = [
            {
                title: childrenTitle,
                items: newChildren
            }
        ]
    }
}


nav.map((items) => {
    items.items.map(item => {
        let con = {
            parentTitle: items.text,
            childrenTitle: item.text,
            type: item.link,
            redDir: item.link
        }
        generate(con)
    })
})

setTimeout(() => {
    const text = `export default  ${JSON.stringify(container)}`;
    console.log('路由生成完成');
    fs.writeFile(writePwd, text, () => {
    })
}, 100)


