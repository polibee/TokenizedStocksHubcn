import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Tokenized Stocks Hub - 代币化股票交易平台',
  tagline: '您的代币化股票交易门户 - 安全、便捷的数字化股票投资平台',
  favicon: 'img/favicon.ico',
  
  // SEO metadata
  metadata: [
    {name: 'keywords', content: '代币化股票,tokenized stocks,数字股票,股票代币,区块链股票,DeFi股票,去中心化金融,股票交易,投资理财'},
    {name: 'description', content: 'Tokenized Stocks Hub是专业的代币化股票交易平台，提供安全便捷的数字化股票投资服务。了解代币化股票交易、平台对比、投资教程等专业内容。'},
    {name: 'author', content: 'Tokenized Stocks Hub'},
    {name: 'robots', content: 'index,follow'},
    {property: 'og:type', content: 'website'},
    {property: 'og:site_name', content: 'Tokenized Stocks Hub'},
    {property: 'twitter:card', content: 'summary_large_image'},
    {property: 'twitter:site', content: '@TokenizedStocks'},
    {name: 'theme-color', content: '#2e8555'},
    {name: 'msapplication-TileColor', content: '#2e8555'},
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://polibee.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.NODE_ENV === 'production' ? '/TokenizedStocksHubcn/' : '/',

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
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
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
        gtag: {
          trackingID: 'G-BY66HR5MTV', // 请替换为您的Google Analytics测量ID
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-sitemap',
      {
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
        filename: 'sitemap.xml',
      },
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
              label: '邮箱：AdamDavisme#outlook.com',
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
  
  // 自定义头部脚本
  scripts: [
    // Google AdSense脚本
    {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8597282005680903',
      async: true,
      crossorigin: 'anonymous',
    },
  ],
};

export default config;
