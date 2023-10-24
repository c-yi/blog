import {defineConfig} from 'vitepress'
// @ts-ignore
import nav from './route/nva.json'
import sidebar from './route/sideBar.js'

const vercelPng = `<svg aria-label="Vercel Logo"  style="stroke: none; fill: #000000;"   viewBox="0 0 75 65" height="26"data-testid="dashboard/logo"><path d="M37.59.25l36.95 64H.64l36.95-64z"/></svg>`

export default defineConfig({
    base: '/blog/',
    outDir: "./dist",
    // srcDir: "../docs/",
    title: "Blog",
    description: "一个博客，记录一路成长",
    markdown: {
        lineNumbers: true,
        toc: {level: [1, 2, 3, 4, 5]},
    },
    lastUpdated: true,
    themeConfig: {
        nav,
        sidebar,
        search: {
            provider: 'local'
        },
        editLink: {
            pattern: 'https://github.com/c-yi/blog/edit/main/:path',
            text: '编辑这个页面'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/c-yi/blog'},
            {icon: {svg: vercelPng}, link: 'https://vercel.com/dashboard'}
        ]
    }
})
