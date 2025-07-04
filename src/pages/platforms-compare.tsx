import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

// Detailed platform data
const platforms = [
  {
    id: 'kraken',
    name: 'Kraken',
    description: 'xStocks - 真实股票代币化产品',
    logo: '/img/exchanges/kraken-svgrepo-com.svg',
    website: 'https://kraken.pxf.io/c/1356313/1589189/10583',
    type: '中心化交易所 (CEX)',
    founded: '2011',
    headquarters: '美国',
    regulation: '多司法管辖区监管',
    kyc: '需要',
    tradingHours: '24/5',
    minInvestment: '$1',
    supportedAssets: '60种资产 (55只股票 + 5只ETF)',
    fees: {
      trading: '免费 (USDG/USD)',
      deposit: '免费 (银行转账)',
      withdrawal: '根据资产类型而定',
      spread: '市场价差'
    },
    features: {
      leverage: '最高 5:1',
      orderTypes: ['市价单', '限价单', '止损单'],
      api: '支持',
      mobile: '支持',
      insurance: '部分资金保险'
    },
    pros: [
      '受监管的真实股票代币化',
      '24/5交易时间',
      '最低1美元投资门槛',
      '多种法币充值选项',
      '高流动性和深度',
      '强大的安全措施'
    ],
    cons: [
      '需要KYC验证',
      '交易费用相对较高',
      '地区限制',
      '客服响应时间较长'
    ],
    bestFor: ['机构投资者', '长期投资者', '注重合规的用户'],
    riskLevel: '低',
    securityFeatures: ['冷存储', '双重认证', '保险基金', 'SOC 2认证']
  },
  {
    id: 'bybit',
    name: 'Bybit',
    description: 'xStocks - 代币化股票交易',
    logo: '/img/exchanges/bybit-svgrepo-com.svg',
    website: 'https://www.bybitglobal.com/invite?ref=LG8DXGG',
    type: '中心化交易所 (CEX)',
    founded: '2018',
    headquarters: '新加坡',
    regulation: '部分监管',
    kyc: '需要',
    tradingHours: '24/7',
    minInvestment: '$1',
    supportedAssets: '100+股票和ETF',
    fees: {
      trading: '0.1% (现货交易)',
      deposit: '免费',
      withdrawal: '基于网络费用',
      spread: '紧密价差'
    },
    features: {
      leverage: '最高 10:1',
      orderTypes: ['市价单', '限价单', '条件单', '止盈/止损单'],
      api: '支持',
      mobile: '优秀的移动应用',
      insurance: '保险基金'
    },
    pros: [
      '24/7全天候交易',
      '杠杆交易支持',
      '丰富的股票选择',
      '专业交易工具',
      '移动端优化',
      '快速执行'
    ],
    cons: [
      '监管不如Kraken全面',
      '客服质量不稳定',
      '部分高级功能复杂',
      '风险管理要求较高'
    ],
    bestFor: ['活跃交易者', '专业投资者', '寻求低费用的用户'],
    riskLevel: '中等',
    securityFeatures: ['冷存储', '双重认证', '风险控制系统', '保险基金']
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'Solana DEX 聚合器',
    logo: '/img/exchanges/jupiter-ag-jup-logo.svg',
    website: 'https://jup.ag',
    type: '去中心化交易所 (DEX)',
    founded: '2021',
    headquarters: '去中心化',
    regulation: '无监管',
    kyc: '不需要',
    tradingHours: '24/7',
    minInvestment: '无限制',
    supportedAssets: '所有Solana代币',
    fees: {
      trading: '0.04% + Solana费用',
      deposit: '仅网络费用',
      withdrawal: '仅网络费用',
      spread: '聚合最佳价格'
    },
    features: {
      leverage: '不支持',
      orderTypes: ['即时兑换', '限价单'],
      api: '支持',
      mobile: '移动端优化网页版',
      insurance: '无'
    },
    pros: [
      '去中心化交易',
      '最佳价格路由',
      '无需KYC',
      '杠杆交易支持',
      '低Gas费用',
      '完全自托管'
    ],
    cons: [
      '无客户支持',
      '技术门槛较高',
      '流动性依赖市场',
      '无保险保护',
      '智能合约风险'
    ],
    bestFor: ['DeFi用户', '隐私倡导者', '技术熟练用户'],
    riskLevel: '高',
    securityFeatures: ['开源代码', '审计报告', '去中心化', '自托管']
  },
  {
    id: 'gate',
    name: 'Gate.io',
    description: 'xStocks 专区 - 现货、合约、Alpha 交易',
    logo: '/img/exchanges/full-gate-io-logo.svg',
    website: 'https://www.gateweb.xyz/share/bvbnafk',
    type: 'Centralized Exchange (CEX)',
    founded: '2013',
    headquarters: 'Seychelles',
    regulation: 'Multi-jurisdictional regulation',
    kyc: 'Required',
    tradingHours: '24/7',
    minInvestment: 'No limit',
    supportedAssets: '8 major xStocks (COINX, NVDAX, CRCLX, AAPLX, METAX, HOODX, TSLAX, GOOGLX)',
    fees: {
      trading: '现货: 0.1%/0.1% (挂单/吃单), 合约: 0.02%/0.05%',
      deposit: 'Free (crypto)',
      withdrawal: 'Based on network fees',
      spread: 'Competitive spreads'
    },
    features: {
      leverage: 'Up to 10:1 (perpetual contracts)',
      orderTypes: ['Market order', 'Limit order', 'Stop order', 'Conditional order'],
      api: 'Supported',
      mobile: 'Excellent mobile app',
      insurance: 'Insurance fund'
    },
    pros: [
      '支持现货和永续合约交易',
      '1-10倍杠杆做多做空',
      '24/7 全天候交易',
      '支持碎股与链上转账',
      'Alpha 交易支持',
      '无国界交易体验',
      '丰富的交易工具'
    ],
    cons: [
      'KYC 验证要求',
      '部分地区受限',
      '客服响应时间较长',
      '高级功能学习成本'
    ],
    bestFor: ['活跃交易者', '合约交易者', '多样化投资者'],
    riskLevel: 'Medium',
    securityFeatures: ['Cold storage', '2FA', 'Insurance fund', 'Risk management system']
  }
];

// Use the platforms data defined above, but need to convert format
const platformsData = platforms.map(platform => ({
  id: platform.id,
  name: platform.name,
  type: platform.type === 'Centralized Exchange (CEX)' ? 'CEX' : platform.type === 'Decentralized Exchange (DEX)' ? 'DEX Aggregator' : platform.type,
  description: platform.description,
  logo: platform.logo,
  url: platform.website,
  fees: {
    trading: platform.fees.trading,
    spread: platform.fees.spread,
    withdrawal: platform.fees.withdrawal,
    deposit: platform.fees.deposit
  },
  features: {
    kyc: platform.kyc,
    tradingHours: platform.tradingHours,
    minInvestment: platform.minInvestment,
    leverage: platform.features?.leverage || 'None',
    custody: platform.id === 'kraken' ? '平台托管 + 自托管选项' : platform.id === 'jupiter' ? '自托管' : '平台托管',
    fiatSupport: platform.id === 'jupiter' ? '不支持' : '支持',
    insurance: platform.features?.insurance || '无'
  },
  assets: {
    count: platform.supportedAssets,
    types: platform.id === 'kraken' ? ['55只股票', '5只ETF'] : platform.id === 'bybit' ? ['科技股', '加密相关股票'] : ['代币化股票', 'DeFi代币', 'Meme币'],
    examples: platform.id === 'kraken' ? ['AAPLx', 'TSLAx', 'MSFTx', 'GOOGLx', 'AMZNx', 'NVDAx'] : platform.id === 'bybit' ? ['COINX', 'NVDAX', 'CRCLX', 'AAPLX', 'HOODX', 'METAX'] : ['Best prices through aggregation']
  },
  advantages: platform.pros,
  disadvantages: platform.cons,
  regions: {
      supported: platform.id === 'kraken' ? ['亚洲部分地区'] : platform.id === 'bybit' ? ['全球大部分地区'] : ['全球（无地区限制）'],
      restricted: platform.id === 'kraken' ? ['美国', '加拿大', '英国', '欧盟', '澳大利亚'] : platform.id === 'bybit' ? ['美国', '部分受限地区'] : ['无限制']
    },
  howToTrade: platform.id === 'kraken' ? [
    '注册Kraken账户并完成KYC',
    '充值USDG或USD',
    '在现货市场搜索xStock代币',
    '下单交易，支持市价单和限价单',
    '可选择提取到自己的钱包'
  ] : platform.id === 'bybit' ? [
    '注册Bybit账户并完成KYC Level 1',
    '向现货账户充值USDT',
    '前往现货交易 → USDT → 创新区',
    '搜索xStock代币（如AAPLX）',
    '选择订单类型并下单交易'
  ] : [
    '连接Solana钱包（如Phantom）',
    '确保钱包有SOL用于Gas费用',
    '在Jupiter上选择交易对',
    '设置滑点和MEV保护',
    '确认交易并签名'
  ]
}));

const comparisonTable = [
  { label: '平台类型', kraken: 'CEX', bybit: 'CEX', jupiter: 'DEX 聚合器', gate: 'CEX' },
  { label: '交易费用', kraken: '免费 (USDG/USD)', bybit: '0.2%', jupiter: '~0.25%', gate: '0.1%/0.1%' },
  { label: '需要 KYC', kraken: '需要', bybit: '需要', jupiter: '不需要', gate: '需要' },
  { label: '交易时间', kraken: '24/5', bybit: '24/7', jupiter: '24/7', gate: '24/7' },
  { label: '最低投资', kraken: '$1', bybit: '无限制', jupiter: '无限制', gate: 'KYC 才可交易' },
  { label: '法币支持', kraken: '✅', bybit: '✅', jupiter: '❌', gate: '✅' },
  { label: '自托管', kraken: '✅', bybit: '❌', jupiter: '✅', gate: '❌' },
  { label: '杠杆交易', kraken: '❌', bybit: '❌', jupiter: '✅', gate: '✅ (1-10x)' },
  { label: '地区限制', kraken: '较多', bybit: '较少', jupiter: '无', gate: '较少' }
];

export default function PlatformsCompare() {
  const [selectedPlatform, setSelectedPlatform] = useState('kraken');
  const [activeTab, setActiveTab] = useState('overview');

  const currentPlatform = platformsData.find(p => p.id === selectedPlatform);

  return (
    <Layout
      title="详细交易平台对比"
      description="详细对比代币化股票交易平台如 Kraken、Bybit、Jupiter - 功能、费用、优缺点">
      
      {/* Hero Section */}
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            详细交易平台对比
          </Heading>
          <p className="hero__subtitle">
            深入分析代币化股票交易平台的功能、费用结构和使用场景
          </p>
        </div>
      </header>

      <main>
        {/* Quick Comparison Table */}
        <section className={clsx(styles.section, styles.comparisonSection)}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">
              快速对比表
            </Heading>
            <div className={styles.comparisonGrid}>
              {platformsData.map((platform, idx) => (
                <div key={platform.id} className={styles.comparisonCard}>
                  <div className={styles.comparisonCardHeader}>
                    <img src={platform.logo} alt={platform.name} className={styles.comparisonLogo} />
                    <h3>{platform.name}</h3>
                    <span className={styles.platformType}>{platform.type}</span>
                  </div>
                  <div className={styles.comparisonCardBody}>
                    {comparisonTable.map((row, rowIdx) => (
                      <div key={rowIdx} className={styles.comparisonRow}>
                        <span className={styles.comparisonLabel}>{row.label}</span>
                        <span className={styles.comparisonValue}>
                          {platform.id === 'kraken' ? row.kraken : 
                           platform.id === 'bybit' ? row.bybit : 
                           platform.id === 'jupiter' ? row.jupiter : row.gate}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.comparisonCardFooter}>
                    <Link
                      className="button button--primary button--block"
                      href={platform.url}
                      target="_blank">
                      访问平台 →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Selector */}
        <section className={clsx(styles.section, styles.detailSection)}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">
              详细平台分析
            </Heading>
            
            {/* Platform selection buttons */}
            <div className={clsx(styles.platformSelector, "margin-bottom--lg")}>
              {platformsData.map((platform) => (
                <button
                  key={platform.id}
                  className={clsx(
                    styles.platformSelectorBtn,
                    selectedPlatform === platform.id && styles.platformSelectorBtnActive
                  )}
                  onClick={() => setSelectedPlatform(platform.id)}>
                  <img src={platform.logo} alt={platform.name} className={styles.platformSelectorLogo} />
                  <span>{platform.name}</span>
                  <span className={styles.platformSelectorType}>{platform.type}</span>
                </button>
              ))}
            </div>

            {/* Tab Navigation */}
            <div className={styles.tabNavigation}>
              {[
              { key: 'overview', label: '概览', icon: '📊' },
              { key: 'fees', label: '费用', icon: '💰' },
              { key: 'features', label: '功能', icon: '⚙️' },
              { key: 'howto', label: '交易指南', icon: '📖' }
            ].map((tab) => (
                <button
                  key={tab.key}
                  className={clsx(
                    styles.tabBtn,
                    activeTab === tab.key && styles.tabBtnActive
                  )}
                  onClick={() => setActiveTab(tab.key)}>
                  <span className={styles.tabIcon}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Platform details */}
            {currentPlatform && (
              <div className="card">
                <div className="card__header">
                  <div className="text--center">
                    <img src={currentPlatform.logo} alt={currentPlatform.name} style={{width: '40px', marginBottom: '16px'}} />
                    <Heading as="h3">{currentPlatform.name}</Heading>
                    <p>{currentPlatform.description}</p>
                    <Link
                      className="button button--primary"
                      href={currentPlatform.url}
                      target="_blank">
                      访问平台 →
                    </Link>
                  </div>
                </div>
                
                <div className="card__body">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="row">
                      <div className="col col--6">
                        <h4>✅ 优势</h4>
                        <ul>
                          {currentPlatform.advantages.map((advantage, idx) => (
                            <li key={idx}>{advantage}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="col col--6">
                        <h4>❌ 劣势</h4>
                        <ul>
                          {currentPlatform.disadvantages.map((disadvantage, idx) => (
                            <li key={idx}>{disadvantage}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="col col--12">
                        <h4>🌍 地区支持</h4>
                        <p><strong>支持地区:</strong> {currentPlatform.regions.supported.join(', ')}</p>
                        <p><strong>限制地区:</strong> {currentPlatform.regions.restricted.join(', ')}</p>
                      </div>
                    </div>
                  )}

                  {/* Fees Tab */}
                  {activeTab === 'fees' && (
                    <div>
                      <h4>💰 费用结构</h4>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            {Object.entries(currentPlatform.fees).map(([key, value]) => (
                              <tr key={key}>
                                <td><strong>{key === 'trading' ? '交易费用' : 
                                           key === 'spread' ? '价差' :
                                           key === 'withdrawal' ? '提现费用' :
                                           key === 'deposit' ? '充值费用' :
                                           key === 'positionLimit' ? '持仓限制' :
                                           key === 'solanaFees' ? 'Solana网络费用' :
                                           key === 'jitoTip' ? 'Jito小费' :
                                           key === 'platformFee' ? '平台费用' : key}</strong></td>
                                <td>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Features Tab */}
                  {activeTab === 'features' && (
                    <div>
                      <h4>⚙️ 平台功能</h4>
                      <div className="row">
                        <div className="col col--6">
                          <div className="table-responsive">
                            <table className="table">
                              <tbody>
                                <tr><td><strong>需要KYC</strong></td><td>{currentPlatform.features.kyc}</td></tr>
                                <tr><td><strong>交易时间</strong></td><td>{currentPlatform.features.tradingHours}</td></tr>
                                <tr><td><strong>最低投资</strong></td><td>{currentPlatform.features.minInvestment}</td></tr>
                                <tr><td><strong>杠杆支持</strong></td><td>{currentPlatform.features.leverage}</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="col col--6">
                          <div className="table-responsive">
                            <table className="table">
                              <tbody>
                                <tr><td><strong>资产托管</strong></td><td>{currentPlatform.features.custody}</td></tr>
                                <tr><td><strong>法币支持</strong></td><td>{currentPlatform.features.fiatSupport}</td></tr>
                                <tr><td><strong>保险保护</strong></td><td>{currentPlatform.features.insurance}</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      
                      <h4>📊 支持资产</h4>
                      <p><strong>资产数量:</strong> {currentPlatform.assets.count}</p>
                      <p><strong>资产类型:</strong> {currentPlatform.assets.types.join(', ')}</p>
                      <p><strong>示例:</strong> {currentPlatform.assets.examples.join(', ')}</p>
                    </div>
                  )}

                  {/* Trading Guide Tab */}
                  {activeTab === 'howto' && (
                    <div>
                      <h4>📖 交易步骤</h4>
                      <ol>
                        {currentPlatform.howToTrade.map((step, idx) => (
                          <li key={idx} className="margin-bottom--sm">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Selection Recommendations */}
        <section className={styles.section}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">
              选择建议
            </Heading>
            <div className="row">
              <div className="col col--4">
                <div className="card">
                  <div className="card__header text--center">
                    <h3>🔰 初学者用户</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>推荐: Kraken</strong></p>
                    <ul>
                      <li>监管保护，资金安全</li>
                      <li>客户支持，操作简单</li>
                      <li>法币入金，门槛较低</li>
                      <li>最低1美元投资门槛</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <div className="card">
                  <div className="card__header text--center">
                    <h3>💰 活跃交易者</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>推荐: Bybit + Jupiter</strong></p>
                    <ul>
                      <li>Bybit: 24/7交易时间</li>
                      <li>Jupiter: 最佳价格聚合</li>
                      <li>高流动性支持</li>
                      <li>多平台套利机会</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <div className="card">
                  <div className="card__header text--center">
                    <h3>🚀 DeFi 用户</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>推荐: Jupiter</strong></p>
                    <ul>
                      <li>完全去中心化</li>
                      <li>无需KYC验证</li>
                      <li>杠杆交易支持</li>
                      <li>MEV保护功能</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Cryptocurrency Exchanges */}
        <section className={styles.section}>
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">
              🏆 推荐加密货币交易所
            </Heading>
            <p className="text--center margin-bottom--lg text--secondary">
              以下是精心挑选的优质加密货币交易所，为您提供更多交易选择
            </p>
            <div className="row">
              {/* Binance */}
              <div className="col col--6 margin-bottom--lg">
                <div className="card">
                  <div className="card__header">
                    <div className="avatar">
                      <img
                        className="avatar__photo"
                        src="/img/exchanges/binance-svgrepo-com.svg"
                        alt="Binance"
                      />
                      <div className="avatar__intro">
                        <div className="avatar__name">Binance</div>
                        <small className="avatar__subtitle">全球最大加密货币交易所</small>
                      </div>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>按交易量计算的全球最大加密货币交易所，提供现货、期货、期权和各种交易服务。拥有BNB生态系统，支持超过350个加密货币交易对。</p>
                    <ul>
                      <li>✅ 全球最大交易量和流动性</li>
                      <li>✅ 超过350种加密货币</li>
                      <li>✅ 多样化交易产品</li>
                      <li>✅ BNB生态系统优势</li>
                    </ul>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary button--block"
                      href="https://accounts.binance.com/register?ref=11891717"
                      target="_blank">
                      立即注册 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* OKX */}
              <div className="col col--6 margin-bottom--lg">
                <div className="card">
                  <div className="card__header">
                    <div className="avatar">
                      <img
                        className="avatar__photo"
                        src="/img/exchanges/okx-1.svg"
                        alt="OKX"
                      />
                      <div className="avatar__intro">
                        <div className="avatar__name">OKX</div>
                        <small className="avatar__subtitle">全球领先数字资产平台</small>
                      </div>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>成立于2017年，提供包括现货、杠杆、期权/交割/永续合约、DEX交易在内的多元化产品矩阵，覆盖200多个国家和地区。</p>
                    <ul>
                      <li>✅ 全球首批提供加密衍生品</li>
                      <li>✅ Web3钱包集成</li>
                      <li>✅ 覆盖200+国家和地区</li>
                      <li>✅ 多元化产品矩阵</li>
                    </ul>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary button--block"
                      href="https://www.okx.com/join/1912474"
                      target="_blank">
                      立即注册 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Gate.io */}
              <div className="col col--6 margin-bottom--lg">
                <div className="card">
                  <div className="card__header">
                    <div className="avatar">
                      <img
                        className="avatar__photo"
                        src="/img/exchanges/full-gate-io-logo.svg"
                        alt="Gate.io"
                      />
                      <div className="avatar__intro">
                        <div className="avatar__name">Gate.io</div>
                        <small className="avatar__subtitle">全球真实交易量前三</small>
                      </div>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>成立于2013年，按真实交易量全球排名前三，支持超过3600种数字资产，首家承诺100%准备金的交易所。</p>
                    <ul>
                      <li>✅ 支持3600+数字资产</li>
                      <li>✅ 100%准备金承诺</li>
                      <li>✅ 全球交易量前三</li>
                      <li>✅ 3000万+用户</li>
                    </ul>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary button--block"
                      href="https://www.gate.io/signup/AgBFAApb"
                      target="_blank">
                      立即注册 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pionex */}
              <div className="col col--6 margin-bottom--lg">
                <div className="card">
                  <div className="card__header">
                    <div className="avatar">
                      <img
                        className="avatar__photo"
                        src="/img/exchanges/pionex@logotyp.us.svg"
                        alt="Pionex"
                      />
                      <div className="avatar__intro">
                        <div className="avatar__name">Pionex</div>
                        <small className="avatar__subtitle">全球最大量化交易机器人平台</small>
                      </div>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>全球首家内置量化交易机器人的加密货币交易所，提供16个免费交易机器人，聚合币安和火币的流动性。</p>
                    <ul>
                      <li>✅ 16个免费交易机器人</li>
                      <li>✅ 聚合顶级交易所流动性</li>
                      <li>✅ 网格交易专家</li>
                      <li>✅ 24/7自动化交易</li>
                    </ul>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary button--block"
                      href="https://www.pionex.com/zh-CN/sign/ref/mWhH4v29"
                      target="_blank">
                      立即注册 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bitget */}
              <div className="col col--6 margin-bottom--lg">
                <div className="card">
                  <div className="card__header">
                    <div className="avatar">
                      <img
                        className="avatar__photo"
                        src="/img/exchanges/bitget-token-new-bgb-logo.svg"
                        alt="Bitget"
                      />
                      <div className="avatar__intro">
                        <div className="avatar__name">Bitget</div>
                        <small className="avatar__subtitle">全球领先跟单交易平台</small>
                      </div>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>福布斯全球最受信任交易所第8名，拥有1亿+用户，以跟单交易功能著称，支持800+加密货币交易。</p>
                    <ul>
                      <li>✅ 福布斯全球最受信任前8名</li>
                      <li>✅ 领先的跟单交易功能</li>
                      <li>✅ 支持800+加密货币</li>
                      <li>✅ 3亿美元保护基金</li>
                    </ul>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary button--block"
                      href="https://share.glassgs.com/u/5HPFVMZN"
                      target="_blank">
                      立即注册 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Backpack */}
              <div className="col col--6 margin-bottom--lg">
                <div className="card">
                  <div className="card__header">
                    <div className="avatar">
                      <img
                        className="avatar__photo"
                        src="/img/exchanges/backpack.png"
                        alt="Backpack"
                      />
                      <div className="avatar__intro">
                        <div className="avatar__name">Backpack</div>
                        <small className="avatar__subtitle">Solana生态原生交易所</small>
                      </div>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>专为Solana生态打造的原生交易所，提供无缝的链上链下交易体验，支持现货、期货和期权交易。</p>
                    <ul>
                      <li>✅ Solana原生交易体验</li>
                      <li>✅ 链上链下无缝切换</li>
                      <li>✅ 低延迟高性能</li>
                      <li>✅ 创新交易功能</li>
                    </ul>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary button--block"
                      href="https://backpack.exchange/join/83faf9aa-e6a4-47ec-8f24-fe64708b3cb6"
                      target="_blank">
                      立即注册 →
                    </Link>
                  </div>
                </div>
              </div>

              {/* EdgeX */}
              <div className="col col--6 margin-bottom--lg">
                <div className="card">
                  <div className="card__header">
                    <div className="avatar">
                      <img
                        className="avatar__photo"
                        src="/img/exchanges/edgex-logo.svg"
                        alt="EdgeX"
                      />
                      <div className="avatar__intro">
                        <div className="avatar__name">EdgeX</div>
                        <small className="avatar__subtitle">新一代衍生品交易平台</small>
                      </div>
                    </div>
                  </div>
                  <div className="card__body">
                    <p>专注于衍生品交易的新一代平台，提供期货、期权和结构化产品，具有专业的风控系统和流动性。</p>
                    <ul>
                      <li>✅ 专业衍生品交易</li>
                      <li>✅ 高级风控系统</li>
                      <li>✅ 机构级流动性</li>
                      <li>✅ 创新金融产品</li>
                    </ul>
                  </div>
                  <div className="card__footer">
                    <Link
                      className="button button--primary button--block"
                      href="https://pro.edgex.exchange/referral/landing/590595640"
                      target="_blank">
                      立即注册 →
                    </Link>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="text--center margin-top--lg">
              <div className="alert alert--info">
                <p><strong>💡 友情提醒:</strong> 以上交易所均为知名平台，请根据自身需求选择。建议分散投资，降低单一平台风险。</p>
              </div>
              <div className="alert alert--warning margin-top--lg">
              <h4>⚠️ 风险警告</h4>
              <p>
                加密货币交易涉及高风险，价格波动剧烈。请确保您了解相关风险，并根据自身财务状况谨慎投资。
                本站提供的信息仅供参考，不构成投资建议。
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Risk Warning */}
        <section className={clsx(styles.section, styles.sectionAlt)}>
          <div className="container">
            <div className="text--center">
              <Heading as="h2">⚠️ 风险警告</Heading>
              <div className="row">
                <div className="col col--8 col--offset-2">
                  <div className="alert alert--warning">
                    <h4>投资风险</h4>
                    <ul className="text--left">
                      <li>代币化股票价格可能与传统股票存在差异</li>
                      <li>中心化交易所存在平台风险</li>
                      <li>去中心化交易存在智能合约风险</li>
                      <li>加密货币市场波动性极高</li>
                      <li>监管政策可能发生变化</li>
                    </ul>
                    <p><strong>请在充分了解风险的前提下进行投资。建议分散投资以降低风险。</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}