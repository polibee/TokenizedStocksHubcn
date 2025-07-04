import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { ReactNode } from 'react';
import { formatDistance } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { getAllTutorials, TutorialData } from '../utils/blogUtils';

import styles from './tutorials.module.css';

// 分类数据
const categories = [
  { id: 'all', name: '全部教程', icon: '📚' },
  { id: 'tutorial', name: '教程指南', icon: '🚀' },
  { id: 'basics', name: '基础知识', icon: '📖' },
  { id: 'trading', name: '交易平台', icon: '💹' },
  { id: 'advanced', name: '高级策略', icon: '🎯' }
];

// 排序选项数据
const sortOptions = [
  { id: 'date-desc', name: '最新发布', icon: '📅' },
  { id: 'date-asc', name: '最早发布', icon: '📆' },
  { id: 'title-asc', name: '标题 A-Z', icon: '🔤' },
  { id: 'title-desc', name: '标题 Z-A', icon: '🔡' },
  { id: 'readTime-asc', name: '阅读时间短', icon: '⏱️' },
  { id: 'readTime-desc', name: '阅读时间长', icon: '⏰' }
];

// 难度映射
const difficultyMap = {
  'tutorial': '初级',
  'basics': '入门', 
  'trading': '中级',
  'advanced': '高级'
};

// 分类映射
const categoryMap = {
  'tutorial': '教程指南',
  'basics': '基础知识',
  'trading': '交易平台', 
  'advanced': '高级策略'
};

// 难度颜色映射
const difficultyColors = {
  '入门': 'success',
  '中级': 'warning', 
  '高级': 'danger'
};

function HeroSection() {
  return (
    <header className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            学习教程
          </Heading>
          <p className={styles.heroSubtitle}>
            从零开始学习代币化股票交易，掌握各种交易策略和技巧
          </p>
        </div>
      </div>
    </header>
  );
}

function CategoryFilter({ activeCategory, onCategoryChange, searchTerm, onSearchChange, categoriesWithCount, sortBy, onSortChange }: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categoriesWithCount: Array<{id: string, name: string, icon: string, count: number}>;
  sortBy: string;
  onSortChange: (sort: string) => void;
}) {
  return (
    <section className={styles.categoryFilter}>
      <div className="container">
        {/* 搜索框 */}
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="搜索教程..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className={styles.clearButton}
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        {/* 分类过滤器和排序 */}
        <div className={styles.filtersContainer}>
          <div className={styles.filterButtons}>
            {categoriesWithCount.map((category) => (
              <button
                key={category.id}
                className={clsx(
                  styles.filterButton,
                  activeCategory === category.id && styles.filterButtonActive
                )}
                onClick={() => onCategoryChange(category.id)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                <span className={styles.categoryName}>{category.name}</span>
                <span className={styles.categoryCount}>({category.count})</span>
              </button>
            ))}
          </div>
          
          {/* 排序选择器 */}
          <div className={styles.sortContainer}>
            <label className={styles.sortLabel}>排序方式：</label>
            <select 
              value={sortBy} 
              onChange={(e) => onSortChange(e.target.value)}
              className={styles.sortSelect}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.icon} {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

function TutorialCard({ tutorial }: { tutorial: any }) {
  const tutorialDate = new Date(tutorial.date);
  const relativeTime = formatDistance(tutorialDate, new Date(), { 
    addSuffix: true, 
    locale: zhCN 
  });

  const handleCardClick = (e: React.MouseEvent) => {
    // 如果点击的是链接或按钮，不处理卡片点击
    if ((e.target as HTMLElement).closest('a, button')) {
      return;
    }
    // 否则导航到教程页面
    window.location.href = tutorial.url;
  };

  return (
    <article className={styles.tutorialCard} onClick={handleCardClick}>
      <div className={styles.cardHeader}>
        <div className={styles.cardImageContainer}>
          <img 
            src={tutorial.thumbnail} 
            alt={tutorial.title}
            className={styles.cardThumbnail}
            loading="lazy"
          />
          <div className={styles.cardOverlay}>
            <span className={clsx(
              styles.difficultyBadge,
              styles[`difficulty${tutorial.difficulty}`]
            )}>
              {tutorial.difficulty}
            </span>
          </div>
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.category}>
            {categoryMap[tutorial.category] || tutorial.category}
          </span>
          <span className={styles.readTime}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {tutorial.readTime}
          </span>
        </div>
        
        <h3 className={styles.cardTitle}>
          <Link to={tutorial.url} className={styles.titleLink}>
            {tutorial.title}
          </Link>
        </h3>
        
        <p className={styles.cardDescription}>{tutorial.description}</p>
        
        <div className={styles.cardTags}>
          {tutorial.tags.slice(0, 4).map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className={styles.cardFooter}>
        <div className={styles.cardInfo}>
          <time className={styles.lastUpdated} dateTime={tutorialDate.toISOString()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {relativeTime}
          </time>
        </div>
        <Link to={tutorial.url} className={styles.cardButton}>
          开始学习
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}

function TutorialsGrid({ tutorials }: { tutorials: any[] }) {
  if (tutorials.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📚</div>
        <h3>暂无教程</h3>
        <p>该分类下暂无教程内容</p>
      </div>
    );
  }

  return (
    <div className={styles.tutorialsGrid}>
      {tutorials.map((tutorial) => (
        <TutorialCard key={tutorial.id} tutorial={tutorial} />
      ))}
    </div>
  );
}



export default function TutorialsPage(): ReactNode {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [tutorialsData, setTutorialsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载教程数据
  React.useEffect(() => {
    const loadTutorials = async () => {
      try {
        setLoading(true);
        const tutorials = await getAllTutorials();
        const processedTutorials = tutorials.map(tutorial => {
          const tutorialDate = new Date(tutorial.date);
          return {
            id: tutorial.id,
            title: tutorial.title,
            description: tutorial.description || '',
            category: tutorial.category,
            readTime: `${tutorial.readTime} min`,
            lastUpdated: tutorialDate.toLocaleDateString('zh-CN'),
            thumbnail: tutorial.thumbnail || '/img/tutorials/default.svg',
            url: tutorial.url,
            difficulty: tutorial.difficulty,
            tags: tutorial.tags,
            date: tutorialDate
          };
        }).sort((a, b) => b.date.getTime() - a.date.getTime());
        
        setTutorialsData(processedTutorials);
      } catch (error) {
        console.warn('Failed to load tutorials:', error);
        setTutorialsData([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadTutorials();
  }, []);

  // 更新分类数据以包含计数
  const categoriesWithCount = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? tutorialsData.length : tutorialsData.filter(t => t.category === cat.id).length
    }));
  }, [tutorialsData]);

  // 过滤和排序教程
  const filteredTutorials = useMemo(() => {
    let filtered = tutorialsData.filter(tutorial => {
      const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
      const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // 应用排序
    switch (sortBy) {
      case 'date-desc':
        return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
      case 'date-asc':
        return filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
      case 'title-asc':
        return filtered.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
      case 'title-desc':
        return filtered.sort((a, b) => b.title.localeCompare(a.title, 'zh-CN'));
      case 'readTime-asc':
        return filtered.sort((a, b) => {
          const aTime = parseInt(a.readTime.replace(' min', ''));
          const bTime = parseInt(b.readTime.replace(' min', ''));
          return aTime - bTime;
        });
      case 'readTime-desc':
        return filtered.sort((a, b) => {
          const aTime = parseInt(a.readTime.replace(' min', ''));
          const bTime = parseInt(b.readTime.replace(' min', ''));
          return bTime - aTime;
        });
      default:
        return filtered;
    }
  }, [tutorialsData, selectedCategory, searchTerm, sortBy]);

  if (loading) {
    return (
      <Layout
        title="学习教程"
        description="从零开始学习代币化股票交易，掌握各种交易策略和技巧">
        <HeroSection />
        <main>
          <section className="container margin-vert--lg">
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>⏳</div>
              <h3>加载中...</h3>
              <p>正在加载教程数据，请稍候</p>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title="学习教程"
      description="从零开始学习代币化股票交易，掌握各种交易策略和技巧">
      <HeroSection />
      <CategoryFilter 
        activeCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoriesWithCount={categoriesWithCount}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <main>
        <section className="container margin-vert--lg">
          {filteredTutorials.length > 0 ? (
            <>
              <div className={styles.resultsHeader}>
                <h2 className={styles.resultsTitle}>
                  {searchTerm ? (
                    <>搜索结果 <span className={styles.searchTerm}>"{searchTerm}"</span></>
                  ) : (
                    selectedCategory === 'all' ? '全部教程' : categoriesWithCount.find(c => c.id === selectedCategory)?.name
                  )}
                </h2>
                <span className={styles.resultsCount}>
                  找到 {filteredTutorials.length} 个教程
                </span>
              </div>
              <TutorialsGrid tutorials={filteredTutorials} />
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📚</div>
              <h3 className={styles.emptyTitle}>
                {searchTerm ? '未找到相关教程' : '暂无教程'}
              </h3>
              <p className={styles.emptyDescription}>
                {searchTerm ? (
                  <>尝试使用其他关键词搜索，或 <button onClick={() => setSearchTerm('')} className={styles.clearSearchButton}>清除搜索条件</button></>
                ) : (
                  '教程正在准备中，敬请期待'
                )}
              </p>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}