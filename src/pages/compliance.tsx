import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

// 定义公司数据类型
interface CompanyData {
  id: string;
  name: string;
  logo: string;
  description: string;
  issuer: {
    name: string;
    location: string;
    regulator: string;
    license: string[];
  };
  custodians: Array<{
    name: string;
    location: string;
    role: string;
  }>;
  prohibitedCountries: Array<{
    flag: string;
    name: string;
    reason: string;
  }>;
  restrictedCountries: string[];
  contactInfo: {
    email: string;
    website: string;
    address: string;
  };
  legalDocs: Array<{
    title: string;
    url: string;
  }>;
}

// 公司数据
const companiesData: CompanyData[] = [
  {
    id: 'xstock',
    name: 'xStock (Backed Assets)',
    logo: '🏢',
    description: 'Tokenized stock services provided by Backed Assets',
    issuer: {
      name: 'Backed Assets (JE) Limited',
      location: 'Jersey, Channel Islands',
      regulator: 'JFSC',
      license: ['Financial Services License', 'Digital Asset Custody License']
    },
    custodians: [
      {
        name: 'Alpaca Securities LLC',
        location: 'New York, USA',
        role: 'Primary Custodian'
      },
      {
        name: 'InCore Bank AG',
        location: 'Switzerland',
        role: 'Custodian Bank'
      },
      {
        name: 'Maerki Baumann & Co. AG',
        location: 'Zurich, Switzerland',
        role: 'Private Bank'
      }
    ],
    prohibitedCountries: [
      { flag: '🇮🇷', name: 'Iran', reason: 'International Sanctions' },
      { flag: '🇰🇵', name: 'North Korea', reason: 'International Sanctions' },
      { flag: '🇸🇾', name: 'Syria', reason: 'International Sanctions' },
      { flag: '🇺🇸', name: 'United States', reason: 'Unregistered Securities' },
    ],
    restrictedCountries: [
      '🇦🇫 Afghanistan', '🇧🇾 Belarus', '🇨🇫 Central African Republic', '🇨🇩 Democratic Republic of Congo',
      '🇨🇺 Cuba', '🇪🇹 Ethiopia', '🇭🇹 Haiti', '🇮🇶 Iraq',
      '🇱🇧 Lebanon', '🇱🇾 Libya', '🇲🇱 Mali', '🇲🇿 Mozambique',
      '🇲🇲 Myanmar', '🇳🇮 Nicaragua', '🇳🇬 Nigeria', '🇺🇦 Ukraine Occupied Areas',
      '🇷🇺 Russia', '🇸🇴 Somalia', '🇸🇸 South Sudan', '🇸🇩 Sudan',
      '🇹🇷 Turkey', '🇻🇪 Venezuela', '🇾🇪 Yemen', '🇿🇼 Zimbabwe'
    ],
    contactInfo: {
      email: 'contact@backedassets.fi',
      website: 'https://assets.backed.fi',
      address: 'First Floor, La Chasse Chambers, Ten La Chasse,St. Helier, Jersey, JE2 4UE',
    },
    legalDocs: [
      { title: 'Legal Documentation', url: 'https://assets.backed.fi/legal-documentation' },
      { title: 'Service Providers', url: 'https://assets.backed.fi/legal-documentation/service-providers' },
      { title: 'Restricted Countries', url: 'https://assets.backed.fi/legal-documentation/restricted-countries' }
    ]
  },
  // 可以在这里添加更多公司数据
  {
    id: 'future-company',
    name: 'Future Partners',
    logo: '🚀',
    description: 'More tokenized stock providers coming soon',
    issuer: {
      name: 'Coming Soon',
      location: 'Global',
      regulator: 'TBD',
      license: ['To Be Announced']
    },
    custodians: [
      {
        name: 'To Be Announced',
        location: 'Global',
        role: 'Custody Services'
      }
    ],
    prohibitedCountries: [],
    restrictedCountries: [],
    contactInfo: {
      email: 'coming-soon@example.com',
      website: '#',
      address: 'Coming Soon'
    },
    legalDocs: []
  }
];

function ComplianceHeader({ selectedCompany, onCompanyChange }: { selectedCompany: string, onCompanyChange: (companyId: string) => void }) {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <h1 className="hero__title">合规信息中心</h1>
        <p className="hero__subtitle">
          了解代币化股票的完整合规框架、监管要求和地理限制
        </p>
        
        {/* 公司选择器 */}
        <div className="margin-bottom--lg">
          <div className="tabs tabs--block">
            {companiesData.map((company) => (
              <div
                key={company.id}
                className={`tabs__item ${
                  selectedCompany === company.id ? 'tabs__item--active' : ''
                }`}
                onClick={() => onCompanyChange(company.id)}
                style={{
                  cursor: 'pointer',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  margin: '0 8px',
                  backgroundColor: selectedCompany === company.id ? 'var(--ifm-color-primary)' : 'var(--ifm-background-surface-color)',
                  color: selectedCompany === company.id ? 'white' : 'var(--ifm-color-content)',
                  border: '2px solid',
                  borderColor: selectedCompany === company.id ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-300)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.2em', marginRight: '8px' }}>{company.logo}</span>
                <strong>{company.name}</strong>
                <div style={{ fontSize: '0.85em', opacity: 0.8, marginTop: '4px' }}>
                  {company.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/compliance">
            查看详细合规文档 📋
          </Link>
        </div>
      </div>
    </header>
  );
}

function ComplianceOverview({ company }: { company: CompanyData }) {
  const features = [
    {
      icon: '🏢',
      title: '发行方信息',
      description: company.issuer.name,
      details: [
        `注册地: ${company.issuer.location}`,
        `监管机构: ${company.issuer.regulator}`,
        ...company.issuer.license
      ]
    },
    {
      icon: '🌍',
      title: '托管服务',
      description: company.custodians.length > 0 ? '由多家知名国际机构提供托管服务' : '托管信息待公布',
      details: company.custodians.map(custodian => custodian.name)
    },
    {
      icon: '⚖️',
      title: '合规框架',
      description: '严格遵守国际金融法规',
      details: ['定期审计报告', '透明度披露', '投资者保护措施']
    },
    {
      icon: '🔒',
      title: '资产安全',
      description: '多重安全保护机制',
      details: ['冷存储保护', '保险覆盖', '风险管理系统']
    }
  ];

  return (
    <section className={styles.complianceOverview}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <ul className={styles.featureDetails}>
                {feature.details.map((detail, detailIdx) => (
                  <li key={detailIdx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RestrictedCountries({ company }: { company: CompanyData }) {
  const prohibitedCountries = company.prohibitedCountries;
  const restrictedCountries = company.restrictedCountries;

  return (
    <section className={styles.restrictionsSection}>
      <div className="container">
        <div className="text--center margin-bottom--lg">
          <h2>🚫 地区限制信息</h2>
          <p className={styles.sectionSubtitle}>了解服务可用性和地区限制</p>
        </div>
        
        <div className={styles.restrictionsGrid}>
          <div className={styles.restrictionCard}>
            <div className={styles.restrictionCardHeader}>
              <div className={styles.restrictionIcon}>❌</div>
              <h3>完全禁止地区</h3>
              <p>以下地区的居民无法使用此服务</p>
            </div>
            <div className={styles.restrictionCardBody}>
              {prohibitedCountries.length > 0 ? (
                prohibitedCountries.map((country, idx) => (
                  <div key={idx} className={styles.countryItem}>
                    <span className={styles.countryFlag}>{country.flag}</span>
                    <div className={styles.countryInfo}>
                      <strong>{country.name}</strong>
                      <small>{country.reason}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: 'var(--ifm-color-emphasis-600)', fontStyle: 'italic' }}>
                  暂无禁止地区信息
                </p>
              )}
            </div>
          </div>
          
          <div className={styles.restrictionCard}>
            <div className={styles.restrictionCardHeader}>
              <div className={styles.restrictionIcon}>⚠️</div>
              <h3>限制地区</h3>
              <p>以下地区可能有额外的限制或要求</p>
            </div>
            <div className={styles.restrictionCardBody}>
              {restrictedCountries.length > 0 ? (
                <div className={styles.countriesGrid}>
                  {restrictedCountries.map((country, idx) => (
                    <div key={idx} className={styles.countryTag}>
                      {country}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: 'center', color: 'var(--ifm-color-emphasis-600)', fontStyle: 'italic' }}>
                  暂无限制地区信息
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceProviders({ company }: { company: CompanyData }) {
  const custodians = company.custodians;

  return (
    <section className="margin-top--lg margin-bottom--lg">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className="text--center margin-bottom--lg">🏢 核心服务提供商</h2>
          </div>
        </div>
        
        <div className="row">
          {custodians.length > 0 ? (
            custodians.map((provider, index) => (
              <div key={index} className="col col--4">
                <div className="card">
                  <div className="card__header">
                    <h3>{provider.name}</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>位置:</strong> {provider.location}</p>
                    <p><strong>角色:</strong> {provider.role}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col col--12">
              <div className="card">
                <div className="card__body text--center">
                  <p style={{ color: 'var(--ifm-color-emphasis-600)', fontStyle: 'italic' }}>
                    服务提供商信息待公布
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {company.legalDocs.length > 0 && (
          <div className="row margin-top--md">
            <div className="col col--12 text--center">
              <Link
                className="button button--secondary button--lg"
                to="/docs/compliance#服务提供商">
                查看完整的服务提供商列表 →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function RiskWarning() {
  return (
    <section className="margin-top--lg margin-bottom--lg">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="card" style={{border: '2px solid #ff6b6b'}}>
              <div className="card__header" style={{backgroundColor: '#ffe0e0'}}>
                <h2>⚠️ 重要风险警告</h2>
              </div>
              <div className="card__body">
                <div className="row">
                  <div className="col col--6">
                    <h3>投资风险</h3>
                    <ul>
                      <li>💰 <strong>价格波动</strong>: 投资价值可能大幅波动</li>
                      <li>🔻 <strong>本金风险</strong>: 可能损失全部投资</li>
                      <li>💧 <strong>流动性风险</strong>: 可能无法及时变现</li>
                      <li>⚙️ <strong>技术风险</strong>: 区块链和智能合约风险</li>
                    </ul>
                  </div>
                  <div className="col col--6">
                    <h3>产品特征</h3>
                    <ul>
                      <li>🗳️ <strong>无股东权利</strong>: 不授予投票权或分红权</li>
                      <li>📈 <strong>价格跟踪</strong>: 仅提供标的资产价格敞口</li>
                      <li>🔄 <strong>自动再投资</strong>: 股息自动再投资为更多代币</li>
                      <li>⚖️ <strong>监管风险</strong>: 监管变化可能影响产品</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComplianceActions() {
  return (
    <section className="margin-top--lg margin-bottom--lg">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className="text--center margin-bottom--lg">📋 合规行动指南</h2>
          </div>
        </div>
        
        <div className="row">
          <div className="col col--6">
            <div className="card">
              <div className="card__header">
                <h3>👤 投资者义务</h3>
              </div>
              <div className="card__body">
                <ol>
                  <li><strong>身份验证</strong>: 完成KYC/AML验证</li>
                  <li><strong>适当性评估</strong>: 确保产品符合投资目标</li>
                  <li><strong>法律合规</strong>: 遵守当地法律法规</li>
                  <li><strong>税务报告</strong>: 按当地要求进行税务申报</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="col col--6">
            <div className="card">
              <div className="card__header">
                <h3>🏛️ 平台义务</h3>
              </div>
              <div className="card__body">
                <ol>
                  <li><strong>客户尽职调查</strong>: 实施严格的KYC程序</li>
                  <li><strong>反洗钱</strong>: 监控可疑交易活动</li>
                  <li><strong>地理限制</strong>: 阻止受限地区的访问</li>
                  <li><strong>风险披露</strong>: 提供完整的风险信息</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo({ company }: { company: CompanyData }) {
  return (
    <section className="margin-top--lg margin-bottom--lg">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="card">
              <div className="card__header">
                <h2>📞 合规联系信息</h2>
              </div>
              <div className="card__body">
                <div className="row">
                  <div className="col col--6">
                    <h3>联系信息</h3>
                    <ul>
                      <li>📧 <strong>Email</strong>: {company.contactInfo.email}</li>
                      <li>🏢 <strong>Company</strong>: {company.issuer.name}</li>
                      <li>📍 <strong>Address</strong>: {company.contactInfo.address}</li>
                      {company.contactInfo.website !== '#' && (
                        <li>🌐 <strong>Website</strong>: <a href={company.contactInfo.website} target="_blank">{company.contactInfo.website}</a></li>
                      )}
                    </ul>
                  </div>
                  <div className="col col--6">
                    <h3>相关链接</h3>
                    {company.legalDocs.length > 0 ? (
                      <ul>
                        {company.legalDocs.map((doc, index) => (
                          <li key={index}>
                            📋 <a href={doc.url} target="_blank">{doc.title}</a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: 'var(--ifm-color-emphasis-600)', fontStyle: 'italic' }}>
                        法律文件待公布
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Compliance(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const [selectedCompany, setSelectedCompany] = useState<string>('xstock');
  
  const currentCompany = companiesData.find(company => company.id === selectedCompany) || companiesData[0];
  
  return (
    <Layout
      title="合规信息中心"
      description="了解代币化股票的完整合规框架、监管要求和地理限制">
      <ComplianceHeader 
        selectedCompany={selectedCompany} 
        onCompanyChange={setSelectedCompany} 
      />
      <main>
        <ComplianceOverview company={currentCompany} />
        <RestrictedCountries company={currentCompany} />
        <ServiceProviders company={currentCompany} />
        <RiskWarning />
        <ComplianceActions />
        <ContactInfo company={currentCompany} />
      </main>
    </Layout>
  );
}