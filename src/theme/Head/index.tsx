import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

export default function CustomHead() {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const baseUrl = 'https://polibee.github.io/TokenizedStocksHubcn';
  const currentUrl = `${baseUrl}${location.pathname}`;

  return (
    <Head>
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Language */}
      <html lang="zh-Hans" />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/TokenizedStocksHubcn/img/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/TokenizedStocksHubcn/img/favicon.ico" />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Security */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      
      {/* Performance */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Tokenized Stocks Hub',
          description: 'Tokenized Stocks Hub是专业的代币化股票交易平台，提供安全便捷的数字化股票投资服务。',
          url: baseUrl,
          logo: `${baseUrl}/img/logo.svg`,
          sameAs: [
            'https://github.com/polibee/TokenizedStocksHubcn'
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'AdamDavisme@outlook.com'
          }
        })}
      </script>
    </Head>
  );
}