import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import SEOHead from '../components/SEO/SEOHead';

import { ReactNode } from 'react';

import styles from './index.module.css';

// Import real tokenized stock data from data file
import productsData from '../../data/products.json';

// Product data
const tokenStocks = productsData; // Only show first 12 products



// Generate Jupiter trading link
function generateJupiterUrl(stock: any): string {
  const jupiterAccount = 'HQaGy9AtmnFhvkhp3QWFZYa9KjPFrn4p2hwoNWQnMcgA';
  const solMint = 'So11111111111111111111111111111111111111112';
  
  // Use contract address from product data
  const tokenMint = stock.contractAddress;
  
  if (!tokenMint) {
    // If no contract address, return Jupiter homepage
    return `https://jup.ag/?referrer=${jupiterAccount}`;
  }
  
  return `https://jup.ag/swap/${solMint}-${tokenMint}?referrer=${jupiterAccount}`;
}

// 平台对比数据
const platforms = [
  {
    name: 'Kraken',
    description: 'xStocks - 真实股票代币化产品',
    fee: '免费 (USDG/USD)',
    kyc: '需要',
    advantages: [
      '合规的真实股票代币化',
      '24/5 交易时间',
      '最低 $1 投资门槛',
      '支持多种法币',
      '高流动性和深度'
    ],
    logo: '/img/exchanges/kraken-svgrepo-com.svg',
    url: 'https://kraken.pxf.io/c/1356313/1589189/10583',
    tradingHours: '24/5',
    minInvestment: '$1',
    assets: '60 种资产 (55 股票 + 5 ETF)',
    regions: '亚洲部分地区 (不包括美国、加拿大、英国、欧盟、澳大利亚)'
  },
  {
    name: 'Bybit',
    description: 'xStocks - 代币化股票交易',
    fee: '0.1% (现货交易)',
    kyc: '需要',
    advantages: [
      '24/7 全天候交易',
      '低交易费用',
      '现货和创新区支持',
      '专业交易工具',
      '移动端优化'
    ],
    logo: '/img/exchanges/bybit-svgrepo-com.svg',
    url: 'https://www.bybitglobal.com/invite?ref=LG8DXGG',
    tradingHours: '24/7',
    minInvestment: '无限制',
    assets: '代币化股票',
    regions: '全球大部分地区'
  },
  {
    name: 'Jupiter',
    description: 'Solana DEX 聚合器',
    fee: '0.04% + Solana 费用',
    kyc: '不需要',
    advantages: [
      '去中心化交易',
      '最佳价格路由',
      '无需 KYC',
      '极低费用',
      '低 Gas 费'
    ],
    logo: '/img/exchanges/jupiter-ag-jup-logo.svg',
    url: 'https://jup.ag',
    tradingHours: '24/7',
    minInvestment: '无限制',
    assets: '所有 Solana 代币',
    regions: '全球 (无地区限制)'
  },
  {
    name: 'Gate.io',
    description: 'xStocks 专区 - 现货、合约、Alpha 交易',
    fee: '现货: 0.1%/0.1% (挂单/吃单), 合约: 0.02%/0.05%',
    kyc: '需要',
    advantages: [
      '支持现货和永续合约交易',
      '1-10倍杠杆做多做空',
      '24/7 全天候交易',
      '支持碎股与链上转账',
      'Alpha 交易支持',
      '无国界交易体验'
    ],
    logo: '/img/exchanges/full-gate-io-logo.svg',
    url: 'https://www.gate.com',
    tradingHours: '24/7',
    minInvestment: '无限制',
    assets: '8大热门 xStocks (COINX, NVDAX, CRCLX, AAPLX, METAX, HOODX, TSLAX, GOOGLX)',
    regions: '全球大部分地区'
  }
];

// 动态获取教程数据
function getHomeTutorials() {
  try {
    // 尝试动态导入教程数据
    const { getLatestTutorials } = require('../utils/blogUtils');
    const latestTutorials = getLatestTutorials(4);
    
    return latestTutorials.map(tutorial => ({
      title: tutorial.title,
      description: tutorial.description,
      icon: getCategoryIcon(tutorial.category),
      url: tutorial.url
    }));
  } catch (error) {
    // 如果动态加载失败，返回静态数据
     return [
       {
         title: '基础入门',
         description: '了解代币化股票的基本概念和交易原理',
         icon: '📚',
         url: '/blog/tutorial-basics'
       },
       {
         title: '中心化交易所',
         description: '学习在Kraken等CEX平台交易代币化股票',
         icon: '🏦',
         url: '/blog/tutorial-cex'
       },
       {
         title: '去中心化交易所',
         description: '掌握在Uniswap、Jupiter等DEX上的交易技巧',
         icon: '🌐',
         url: '/blog/tutorial-dex'
       },
       {
         title: '高级策略',
         description: '学习套利、流动性挖矿等高级交易策略',
         icon: '🚀',
         url: '/blog/tutorial-advanced'
       }
     ];
  }
}

// 根据分类获取图标
function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    'basics': '📚',
    'tutorial': '📖',
    'trading': '💹',
    'advanced': '🚀'
  };
  return iconMap[category] || '📄';
}

// 教程数据
const tutorials = getHomeTutorials();

// FAQ 数据
const faqs = [
  {
    question: '代币化股票是否合规？',
    answer: '是的，我们展示的代币化股票都来自受监管的发行方，如 Backed Finance 等。'
  },
  {
    question: '交易是否安全？',
    answer: '交易安全性取决于您选择的平台。像 Kraken 这样的中心化交易所受到严格监管，而 DEX 需要您自己管理私钥。'
  },
  {
    question: '价格如何与传统股票同步？',
    answer: '代币化股票通过套利机制与传统股票保持价格同步，通常差异很小。'
  }
];

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="hero__description">
          探索代币化美股世界 - 24/7 交易传统股票，享受 DeFi 的便利与创新
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog/tutorial-intro">
开始学习 📚
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/products-overview">
浏览产品 🔍
          </Link>
        </div>
      </div>
    </header>
  );
}

function TokenCard({stock}) {
  const jupiterUrl = generateJupiterUrl(stock);

  return (
    <div className={clsx('col col--2', styles.tokenCard)}> {/* Changed to col--2 to make cards smaller */}
      <div className="card">
        <div className="card__header">
          <div className={styles.tokenLogo}>
            {stock.logo ? (
              <img src={stock.logo} alt={`${stock.name} logo`} />
            ) : (
              <div className={styles.placeholderLogo}>{stock.symbol}</div>
            )}
          </div>
          <h4>{stock.symbol}</h4> {/* Changed to h4 to reduce title size */}
          <p className={styles.tokenName}>{stock.name}</p>
        </div>
        <div className="card__body">
          <p className={styles.tokenDescription}>{stock.description}</p>
          <div className={styles.platforms}>
            <strong>Chain:</strong> {stock.chain}
          </div>
        </div>
        <div className="card__footer">
          <div className={styles.cardActions}>
            <Link
              className="button button--primary button--sm"
              href={jupiterUrl}
              target="_blank"
              rel="noopener noreferrer">
              <img src="/img/exchanges/jupiter-ag-jup-logo.svg" alt="Jupiter" style={{width: '16px', height: '16px', marginRight: '4px'}} />
              交易
            </Link>
            <Link
              className="button button--outline button--primary button--sm"
              to={`/docs/products/${stock.id}`}>
              详情
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function TokenizedStocksSection() {
  // Only show first 12 products (2 rows)
  const displayedStocks = tokenStocks.slice(0, 12);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">
            Xstock 代币化股票
          </Heading>
          <p>
            探索我们支持的代币化股票，享受 24/7 交易体验
          </p>
          <div className={styles.providerNote}>
            <p><small>
              🏢 目前展示 Xstock 代币化股票产品，未来将支持更多发行方
            </small></p>
          </div>
        </div>
        <div className="row">
          {displayedStocks.map((stock, idx) => (
            <TokenCard key={idx} stock={stock} />
          ))}
        </div>
        <div className="text--center margin-top--lg">
          <Link
            className="button button--outline button--primary button--lg"
            to="/products-overview">
            查看所有产品 ({tokenStocks.length}) →
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlatformCard({platform}) {
  return (
    <div className={clsx('col col--3', styles.platformCard)}>
      <div className="card">
        <div className="card__header text--center">
          <div className={styles.platformLogo}>
            {platform.logo ? (
              <img src={platform.logo} alt={`${platform.name} logo`} style={{width: '40px', height: '40px'}} />
            ) : (
              <div className={styles.placeholderLogo}>{platform.name[0]}</div>
            )}
          </div>
          <h3>{platform.name}</h3>
          <p>{platform.description}</p>
        </div>
        <div className="card__body">
          <div className={styles.platformStats}>
            <div className={styles.stat}>
              <strong>费用:</strong> {platform.fee}
            </div>
            <div className={styles.stat}>
              <strong>交易时间:</strong> {platform.tradingHours}
            </div>
            <div className={styles.stat}>
              <strong>最低投资:</strong> {platform.minInvestment}
            </div>
            <div className={styles.stat}>
              <strong>需要 KYC:</strong> {platform.kyc}
            </div>
          </div>
          <div className={styles.advantages}>
            <strong>优势:</strong>
            <ul>
              {platform.advantages.slice(0, 3).map((advantage, idx) => (
                <li key={idx}>{advantage}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="card__footer">
          <Link
            className="button button--outline button--primary button--block"
            href={platform.url}
            target="_blank">
            访问平台
          </Link>
        </div>
      </div>
    </div>
  );
}

function PlatformComparisonSection() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">
            平台对比
          </Heading>
          <p>
            选择最适合您的交易平台
          </p>
        </div>
        <div className="row">
          {platforms.map((platform, idx) => (
            <PlatformCard key={idx} platform={platform} />
          ))}
        </div>
        <div className="text--center margin-top--lg">
          <Link
            className="button button--primary button--lg"
            to="/platforms-compare">
            详细对比 →
          </Link>
        </div>
      </div>
    </section>
  );
}

function TutorialCard({tutorial}) {
  return (
    <div className={clsx('col col--3', styles.tutorialCard)}>
      <Link to={tutorial.url} className="card">
        <div className="card__header text--center">
          <div className={styles.tutorialIcon}>{tutorial.icon}</div>
          <h4>{tutorial.title}</h4>
        </div>
        <div className="card__body">
          <p>{tutorial.description}</p>
        </div>
      </Link>
    </div>
  );
}

function TutorialsSection() {
  const tutorialData = getHomeTutorials();
  
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">
            学习教程
          </Heading>
          <p>
            从零开始学习代币化股票交易
          </p>
        </div>
        <div className="row">
          {tutorialData.map((tutorial, idx) => (
            <TutorialCard key={idx} tutorial={tutorial} />
          ))}
        </div>
        <div className="text--center margin-top--lg">
          <Link
            className="button button--outline button--primary button--lg"
            to="/tutorials">
            查看所有教程 →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <Heading as="h2">
            常见问题
          </Heading>
          <p>
            快速了解代币化股票的关键信息
          </p>
        </div>
        <div className="row">
          <div className="col col--8 col--offset-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text--center margin-top--lg">
          <Link
            className="button button--primary button--lg"
            to="/docs/faq">
            查看更多常见问题 →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className="text--center">
          <Heading as="h2">
            加入我们的社区
          </Heading>
          <p className="margin-bottom--lg">
            获取最新资讯，与其他交易者交流经验
          </p>
          <div className={styles.communityButtons}>
            <Link
              className="button button--primary button--lg margin--sm"
              href="#"
              target="_blank">
              📱 Telegram
            </Link>
            <Link
              className="button button--outline button--primary button--lg margin--sm"
              href="#"
              target="_blank">
              🐦 X (Twitter)
            </Link>
            <span className="button button--outline button--primary button--lg margin--sm" style={{cursor: 'default'}}>
              💻 GitHub
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <SEOHead
        title="代币化股票交易平台"
        description="探索代币化美股交易世界，24/7交易传统股票，享受DeFi便利。支持苹果、特斯拉、微软等知名股票的代币化版本。"
        keywords="代币化股票,tokenized stocks,数字股票,股票代币,区块链股票,DeFi股票,去中心化金融,股票交易,投资理财,苹果股票,特斯拉股票,微软股票"
        type="website"
        url="/"
      />
      <Layout
        title={`${siteConfig.title} - 代币化股票交易平台`}
        description="探索代币化美股交易世界，24/7交易传统股票，享受DeFi便利。支持苹果、特斯拉、微软等知名股票的代币化版本。">
        <HeroSection />
        <main>
          <TokenizedStocksSection />
          <PlatformComparisonSection />
          <TutorialsSection />
          <FAQSection />
          <CommunitySection />
        </main>
      </Layout>
    </>
  );
}
