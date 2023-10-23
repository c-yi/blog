import {defineConfig} from 'vitepress'
import nav from './route/nva.js'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/blog/',
    outDir: "./dist",
    title: "Blog",
    description: "A VitePress Site",
    markdown: {
        lineNumbers: true
    },
    lastUpdated: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav/*: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/docs/example/markdown-examples' }
    ]*/,

        sidebar: {
            '/docs/es/': [
                {
                    text: '前端基础',
                    items: [
                        {text: '基础', link: '/docs/es/'},
                        {text: 'ts', link: '/docs/es/typeScript'},
                    ]
                }
            ],
            '/docs/vue/': [
                {
                    text: 'vue 相关知识',
                    items: [
                        {text: 'vue', link: '/docs/vue/'},
                        {text: '生命周期', link: '/docs/vue/lifeCircle'},
                        {text: '响应式', link: '/docs/vue/reactive'},
                        {text: 'diff算法', link: '/docs/vue/diff'},
                    ]
                }
            ]
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/vuejs/vitepress'}
        ]
    }
})
