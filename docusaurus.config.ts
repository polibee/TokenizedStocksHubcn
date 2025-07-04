import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Tokenized Stocks Hub',
  tagline: 'Your Gateway to Tokenized Stock Trading',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://polibee.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/TokenizedStocksHubcn/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'polibee', // Usually your GitHub org/user name.
  projectName: 'TokenizedStocksHubcn', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 0, // 禁用Recent posts侧边栏
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Tokenized Stocks Hub',
      logo: {
        alt: 'Tokenized Stocks Hub Logo',
        src: 'img/logo.svg',
      },
      items: [
        { 
          label: '首页', 
          to: '/', 
          position: 'left',
          'aria-label': '首页'
        },
        { 
          label: '代币化股票', 
          to: '/products-overview', 
          position: 'left',
          'aria-label': '代币化股票'
        },
        { 
          label: '平台对比', 
          to: '/platforms-compare', 
          position: 'left',
          'aria-label': '平台对比'
        },
        { 
          label: '学习教程', 
          to: '/tutorials', 
          position: 'left',
          'aria-label': '学习教程'
        },
        { 
          label: '常见问题', 
          to: '/docs/faq', 
          position: 'left',
          'aria-label': '常见问题'
        },
        { 
          label: '合规信息', 
          to: '/compliance', 
          position: 'left',
          'aria-label': '合规信息'
        },

        {
          href: '#',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '产品服务',
          items: [
            {
              label: '代币化股票',
              to: '/products-overview',
            },
            {
              label: '平台对比',
              to: '/platforms-compare',
            },
          ],
        },
        {
          title: '学习资源',
          items: [
            {
              label: '交易教程',
              to: '/tutorials',
            },
            {
              label: '常见问题',
              to: '/docs/faq',
            },
            {
              label: '合规信息',
              to: '/compliance',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'Telegram',
              href: '#',
            },
            {
              label: 'X (Twitter)',
              href: '#',
            },
            {
              label: 'GitHub',
              href: '#',
            },
          ],
        },
        {
          title: '法律信息',
          items: [
            {
              label: '隐私政策',
              to: '/docs/legal/privacy-policy',
            },
            {
              label: '免责声明',
              to: '/docs/legal/disclaimer',
            },
            {
              label: '联盟披露',
              to: '/docs/legal/affiliate-disclosure',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tokenized Stocks Hub. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
