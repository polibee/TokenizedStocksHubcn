import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// 从数据文件导入真实的代币化股票数据
import productsData from '../../data/products.json';

// 生成Jupiter交易链接
function generateJupiterUrl(stock: any): string {
  const jupiterAccount = 'HQaGy9AtmnFhvkhp3QWFZYa9KjPFrn4p2hwoNWQnMcgA';
  const solMint = 'So11111111111111111111111111111111111111112';
  
  // 使用产品数据中的合约地址
  const tokenMint = stock.contractAddress;
  
  if (!tokenMint) {
    // 如果没有合约地址，返回Jupiter主页
    return `https://jup.ag/?referrer=${jupiterAccount}`;
  }
  
  return `https://jup.ag/swap/${solMint}-${tokenMint}?referrer=${jupiterAccount}`;
}

function TokenCard({stock}) {
  const jupiterUrl = generateJupiterUrl(stock);

  return (
    <div className={clsx('col col--3', styles.showcaseCard)}>
      <div className={clsx('card', styles.showcaseCardInner)}>
        <div className={styles.showcaseCardHeader}>
          <div className={styles.showcaseCardImage}>
            {stock.logo ? (
              <img src={stock.logo} alt={`${stock.name} logo`} />
            ) : (
              <div className={styles.placeholderLogo}>{stock.symbol}</div>
            )}
          </div>
          <div className={styles.showcaseCardTitle}>
            <h3>{stock.symbol}</h3>
            <p>{stock.fullName}</p>
          </div>
        </div>
        <div className={styles.showcaseCardBody}>
          <p className={styles.showcaseCardDescription}>
            {stock.keyBenefits || stock.description}
          </p>
          <div className={styles.showcaseCardTags}>
            <span className={styles.showcaseTag}>
              {stock.chain === 'solana' ? (
                <span className={styles.chainWithLogo}>
                  <img src="/img/tokens/solana-sol-logo.svg" alt="Solana" className={styles.chainLogo} />
                  Solana
                </span>
              ) : (
                stock.chain
              )}
            </span>
            {stock.issuer && (
              <span className={styles.showcaseTag}>
                {stock.issuer}
              </span>
            )}
          </div>
        </div>
        <div className={styles.showcaseCardFooter}>
          <Link
            className={clsx('button button--primary', styles.showcaseButton)}
            href={jupiterUrl}
            target="_blank"
            rel="noopener noreferrer">
            <img src="/img/exchanges/jupiter-ag-jup-logo.svg" alt="Jupiter" style={{width: '16px', height: '16px', marginRight: '4px'}} />
            立即交易
          </Link>
          <Link
            className={clsx('button button--outline button--primary', styles.showcaseButton)}
            to={`/docs/products/${stock.id}`}>
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductsOverviewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter products - support fuzzy search
  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      if (!searchTerm) {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesCategory;
      }
      
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.symbol.toLowerCase().includes(searchLower) ||
        product.fullName.toLowerCase().includes(searchLower) ||
        (product.keyBenefits && product.keyBenefits.toLowerCase().includes(searchLower)) ||
        (product.underlyingAsset && product.underlyingAsset.name.toLowerCase().includes(searchLower)) ||
        product.description.toLowerCase().includes(searchLower);
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <Layout
      title="代币化股票概览"
      description="探索所有可用的代币化股票产品">
      <main>
        {/* Hero Section */}
        <section className={clsx('hero hero--primary', styles.heroBanner)}>
          <div className="container">
            <Heading as="h1" className="hero__title">
              代币化股票概览
            </Heading>
            <p className="hero__subtitle">
              探索所有可用的代币化股票产品
            </p>
            <p className="hero__description">
              24/7交易传统股票，享受DeFi的便利和创新
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className={styles.searchSection}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="搜索代币化股票..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                  <div className={styles.filterContainer}>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className={styles.categorySelect}
                    >
                      <option value="all">所有类别</option>
                      <option value="tokenized-stocks">代币化股票</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className={styles.section}>
          <div className="container">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2">代币化股票产品</Heading>
              <p>找到 {filteredProducts.length} 个代币化股票产品</p>
              <div className={styles.providerNote}>
                <p><small>🏢 由 Backed Finance 发行 | 未来将支持更多代币化股票提供商</small></p>
              </div>
            </div>
            
            <div className={clsx("row", styles.showcaseGrid)}>
              {filteredProducts.map((stock, idx) => (
                <TokenCard key={idx} stock={stock} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text--center">
                <p>未找到匹配的产品，请尝试其他搜索词。</p>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className="text--center margin-bottom--lg">
              <Heading as="h2">产品特色</Heading>
            </div>
            <div className="row">
              <div className="col col--3">
                <div className="text--center">
                  <h3>🔒 合规安全</h3>
                  <p>由知名金融机构发行和托管的完全合规代币化股票</p>
                </div>
              </div>
              <div className="col col--3">
                <div className="text--center">
                  <h3>⚡ 24/7交易</h3>
                  <p>打破传统股市时间限制，提供全天候流动性和即时结算</p>
                </div>
              </div>
              <div className="col col--3">
                <div className="text--center">
                  <h3>💰 低成本</h3>
                  <p>相比传统股票交易费用更低，无需传统券商账户</p>
                </div>
              </div>
              <div className="col col--3">
                <div className="text--center">
                  <h3>🌍 全球访问</h3>
                  <p>基于Solana区块链的高性能交易，支持全球投资者</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Warning */}
        <section className={styles.section}>
          <div className="container">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="admonition admonition-warning">
                  <div className="admonition-heading">
                    <h5>⚠️ 风险提示</h5>
                  </div>
                  <div className="admonition-content">
                    <ul>
                      <li>本产品不向美国人士销售</li>
                      <li>代币价格将随标的股票价格波动</li>
                      <li>投资前请仔细阅读相关法律文件</li>
                      <li>过往表现不代表未来收益</li>
                      <li>请根据风险承受能力谨慎投资</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className="text--center">
              <Heading as="h2">开始交易</Heading>
              <p className="margin-bottom--lg">
                选择您感兴趣的代币化股票，立即开始交易
              </p>
              <div className={styles.buttons}>
                <Link
                  className="button button--primary button--lg"
                  to="/tutorials">
                  📚 学习教程
                </Link>
                <Link
                  className="button button--outline button--primary button--lg"
                  to="/platforms-compare">
                  🔍 平台对比
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ProductsOverviewPage;