import { defineConfig } from 'vitepress'
// @ts-ignore
import * as pkg from '../package.json'

export default defineConfig({
    title: 'ForNet',
    lang: 'en-US',
    description: '基于 WireGuard 协议组网快捷方案',
    base:'/documentation/',
    lastUpdated: true,
    cleanUrls: true,
    head: [
        ['meta', { name: 'theme-color', content: '#3c8772' }],

    ],
    themeConfig: {
        nav: nav(),
        sidebar: {
            '/guide/': sidebarGuide(),
        },
        footer: {
            message: 'Released under the BSL 1.1 License',
            copyright: 'Copyright © 2023-present Timzaak'
        }
    },
})


function nav() {
    return [
        { text: 'Guide', link: '/guide/what-is-fornet', activeMatch: '/guide/' },
        {
            text: pkg.version,
            items: [
                {
                    text: 'Changelog',
                    link: 'version_change',
                },
                {
                    text: 'Roadmap',
                    link: 'plan'
                }
            ]
        }
    ]
}

function sidebarGuide() {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            items: [{
                text: 'What is ForNet?',
                link: '/guide/what-is-fornet',
            }, {
                text: 'Quick Start',
                link: '/guide/quick-start',
            }, {
                text: 'Keycloak',
                link: '/guide/keycloak',
            }],
        },
        {
            text: 'Reference',
            collapsed: false,
            items: [{
                text: 'Develop Guide',
                link: '/guide/develop',
            },{
                text: 'Config',
                link: '/guide/config',
            },]
        },

       
    ]
}