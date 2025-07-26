import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StructuredData from './StructuredData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  datePublished?: string;
  dateModified?: string;
  author?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  datePublished,
  dateModified,
  author,
  noindex = false,
}) => {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = 'https://polibee.github.io/TokenizedStocksHubcn';
  
  const seoTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;
  const seoDescription = description || siteConfig.tagline;
  const seoImage = image ? `${baseUrl}${image}` : `${baseUrl}/img/docusaurus-social-card.jpg`;
  const seoUrl = url ? `${baseUrl}${url}` : baseUrl;
  const seoKeywords = keywords || '代币化股票,tokenized stocks,数字股票,股票代币,区块链股票,DeFi股票,去中心化金融,股票交易,投资理财';

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <meta name="author" content={author || 'Tokenized Stocks Hub'} />
        
        {/* Robots */}
        <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={seoUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:site_name" content="Tokenized Stocks Hub" />
        <meta property="og:locale" content="zh_CN" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
        <meta name="twitter:site" content="@Coinowodrop" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#2e8555" />
        <meta name="msapplication-TileColor" content="#2e8555" />
        
        {/* Article specific meta tags */}
        {type === 'article' && datePublished && (
          <meta property="article:published_time" content={datePublished} />
        )}
        {type === 'article' && dateModified && (
          <meta property="article:modified_time" content={dateModified} />
        )}
        {type === 'article' && author && (
          <meta property="article:author" content={author} />
        )}
      </Head>
      
      <StructuredData
        type={type}
        title={title}
        description={description}
        url={url}
        image={image}
        datePublished={datePublished}
        dateModified={dateModified}
        author={author}
      />
    </>
  );
};

export default SEOHead;