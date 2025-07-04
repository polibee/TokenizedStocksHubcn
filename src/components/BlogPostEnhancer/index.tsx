import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
// import { useBlogPost } from '@docusaurus/theme-common';
import RelatedPosts from './RelatedPosts';

interface BlogPostEnhancerProps {
  children: React.ReactNode;
}

const BlogPostEnhancer: React.FC<BlogPostEnhancerProps> = ({ children }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedPostsInjected, setRelatedPostsInjected] = useState(false);
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 检查是否在博客文章页面
  const isBlogPost = location.pathname.startsWith('/blog/');

  // 计算阅读进度
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // 获取相关文章
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        // 模拟相关文章数据，实际项目中应该从API或静态数据获取
        const mockRelatedPosts = [
          {
            title: "代币化股票交易基础教程",
            permalink: "/blog/basics/tutorial-basics",
            excerpt: "了解代币化股票交易的基本概念和操作流程，为新手投资者提供全面的入门指导。",
            date: "2025-01-01",
            tags: ["教程", "基础", "代币化股票"]
          },
          {
            title: "高级交易策略与技巧",
            permalink: "/blog/advanced/tutorial-advanced",
            excerpt: "深入探讨代币化股票的高级交易策略，包括风险管理和投资组合优化。",
            date: "2025-01-02",
            tags: ["高级", "策略", "风险管理"]
          },
          {
            title: "中心化交易所使用指南",
            permalink: "/blog/trading/tutorial-cex",
            excerpt: "详细介绍如何在中心化交易所进行代币化股票交易，包括注册、验证和交易流程。",
            date: "2025-01-03",
            tags: ["CEX", "交易所", "教程"]
          }
        ];
        setRelatedPosts(mockRelatedPosts);
      } catch (error) {
        console.error('Failed to fetch related posts:', error);
      }
    };

    fetchRelatedPosts();
    setRelatedPostsInjected(false);
  }, [location.pathname]);

  // 返回顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // 检查是否为博客相关页面
  const isBlogPage = location.pathname.startsWith('/blog');

  // 如果不是博客相关页面，只返回子组件
  if (!isBlogPage) {
    return <>{children}</>;
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const currentTitle = typeof document !== 'undefined' ? document.title : '';
  const currentTags: string[] = [];

  // 在文章内容末尾注入相关文章
  useEffect(() => {
    if (!isBlogPost || relatedPostsInjected || relatedPosts.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      const articleElement = document.querySelector('article[itemProp="articleBody"]');
      if (articleElement && !relatedPostsInjected) {
        // 检查是否已经注入过相关文章
        const existingRelated = articleElement.querySelector('#related-posts-container');
        if (existingRelated) {
          existingRelated.remove();
        }

        // 创建相关文章容器
        const relatedPostsContainer = document.createElement('div');
        relatedPostsContainer.id = 'related-posts-container';
        relatedPostsContainer.style.marginTop = '3rem';
        relatedPostsContainer.style.paddingTop = '2rem';
        relatedPostsContainer.style.borderTop = '1px solid var(--ifm-color-emphasis-200)';
        
        // 添加相关文章HTML
        relatedPostsContainer.innerHTML = `
          <div style="margin-bottom: 2rem;">
            <h2 style="color: var(--ifm-color-primary); margin-bottom: 1.5rem; font-size: 1.5rem;">📚 相关文章推荐</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
              ${relatedPosts.slice(0, 3).map(post => `
                <div style="border: 1px solid var(--ifm-color-emphasis-200); border-radius: 8px; padding: 1.5rem; background: var(--ifm-background-surface-color); transition: all 0.2s ease; cursor: pointer;" 
                     onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" 
                     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'" 
                     onclick="window.location.href='${post.permalink}'">
                  <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--ifm-color-primary);">${post.title}</h3>
                  <p style="margin: 0 0 1rem 0; color: var(--ifm-color-emphasis-700); font-size: 0.9rem; line-height: 1.4;">${post.excerpt}</p>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--ifm-color-emphasis-600);">
                    <span>${post.date}</span>
                    <div style="display: flex; gap: 0.5rem;">
                      ${post.tags.map(tag => `<span style="background: var(--ifm-color-primary-lightest); color: var(--ifm-color-primary-dark); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem;">${tag}</span>`).join('')}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        
        // 将相关文章容器添加到文章末尾
        articleElement.appendChild(relatedPostsContainer);
        setRelatedPostsInjected(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isBlogPost, relatedPosts, relatedPostsInjected]);

  return (
    <div ref={contentRef}>
      {/* 阅读进度条 - 只在博客文章页面显示 */}
      {isBlogPost && (
        <div className="reading-progress">
          <div 
            className="reading-progress-bar" 
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      )}

      {children}

      {/* 返回顶部按钮 */}
      {showBackToTop && (
        <button 
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="返回顶部"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default BlogPostEnhancer;