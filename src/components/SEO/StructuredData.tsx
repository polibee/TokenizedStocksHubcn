import React from 'react';
import Head from '@docusaurus/Head';

interface StructuredDataProps {
  type?: 'website' | 'article' | 'product' | 'organization';
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

const StructuredData: React.FC<StructuredDataProps> = ({
  type = 'website',
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}) => {
  const baseUrl = 'https://polibee.github.io/TokenizedStocksHubcn';
  
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type === 'website' ? 'WebSite' : type === 'article' ? 'Article' : type === 'product' ? 'Product' : 'Organization',
      name: title || 'Tokenized Stocks Hub - 代币化股票交易平台',
      description: description || 'Tokenized Stocks Hub是专业的代币化股票交易平台，提供安全便捷的数字化股票投资服务。',
      url: url || baseUrl,
    };

    if (type === 'website') {
      return {
        ...baseData,
        '@type': 'WebSite',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
    }

    if (type === 'article') {
      return {
        ...baseData,
        '@type': 'Article',
        headline: title,
        image: image ? `${baseUrl}${image}` : `${baseUrl}/img/docusaurus-social-card.jpg`,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
          '@type': 'Person',
          name: author || 'Tokenized Stocks Hub',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Tokenized Stocks Hub',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/img/logo.svg`,
          },
        },
      };
    }

    if (type === 'organization') {
      return {
        ...baseData,
        '@type': 'Organization',
        logo: `${baseUrl}/img/logo.svg`,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'AdamDavisme@outlook.com',
        },
        sameAs: [
          '#',
        ],
      };
    }

    return baseData;
  };

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Head>
  );
};

export default StructuredData;