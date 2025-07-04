// 动态教程数据，从构建时生成的JSON文件读取
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import tutorialsData from '../data/tutorials.json';

// 教程数据接口
export interface TutorialData {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  readTime: number;
  date: Date;
  thumbnail: string;
  url: string;
  tags: string[];
  slug: string;
}

// 从JSON数据转换为TutorialData格式
function convertJsonToTutorialData(jsonData: any): TutorialData {
  return {
    ...jsonData,
    date: new Date(jsonData.date),
    readTime: jsonData.readTime || 5
  };
}

// 获取动态教程数据
function getDynamicTutorialsData(): TutorialData[] {
  try {
    return tutorialsData.tutorials.map(convertJsonToTutorialData);
  } catch (error) {
    console.error('Error loading tutorials data:', error);
    return [];
  }
}

// 获取所有教程
export async function getAllTutorials(): Promise<TutorialData[]> {
  try {
    // 优先使用动态生成的教程数据
    const dynamicTutorials = getDynamicTutorialsData();
    
    // 在浏览器环境中，尝试从Docusaurus博客数据获取额外信息
    if (typeof window !== 'undefined' && (window as any).__DOCUSAURUS_BLOG_POSTS__) {
      const blogPosts = (window as any).__DOCUSAURUS_BLOG_POSTS__;
      
      // 用Docusaurus数据补充或更新动态数据
      const docusaurusTutorials = blogPosts.map((post: any) => {
        const pathParts = post.metadata.source.split('/');
        const category = pathParts[pathParts.length - 2] || 'tutorial';
        
        return {
          id: post.metadata.permalink.replace('/blog/', ''),
          title: post.metadata.title,
          description: post.metadata.description || post.metadata.excerpt || '',
          category: category,
          difficulty: getDifficultyFromCategory(category),
          readTime: post.metadata.readingTime || 5,
          date: new Date(post.metadata.date),
          thumbnail: getThumbnailFromCategory(category),
          url: post.metadata.permalink,
          tags: post.metadata.tags?.map((tag: any) => tag.label) || [],
          slug: post.metadata.slug
        };
      });
      
      // 合并动态数据和Docusaurus数据，优先使用动态数据
      const mergedTutorials = [...dynamicTutorials];
      docusaurusTutorials.forEach(docTutorial => {
        const existingIndex = mergedTutorials.findIndex(t => t.id === docTutorial.id);
        if (existingIndex === -1) {
          mergedTutorials.push(docTutorial);
        }
      });
      
      return mergedTutorials.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    
    // 回退到动态数据
    return dynamicTutorials.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error getting tutorials:', error);
    // 最后的回退：返回空数组
    return [];
  }
}

// 根据分类获取难度
function getDifficultyFromCategory(category: string): string {
  const difficultyMap: Record<string, string> = {
    'tutorial': '初级',
    'basics': '入门',
    'trading': '中级',
    'advanced': '高级'
  };
  return difficultyMap[category] || '初级';
}

// 根据分类获取缩略图
function getThumbnailFromCategory(category: string): string {
  const thumbnailMap: Record<string, string> = {
    'tutorial': '/img/tutorials/intro.svg',
    'basics': '/img/tutorials/basics.svg',
    'trading': '/img/tutorials/cex.svg',
    'advanced': '/img/tutorials/advanced.svg'
  };
  return thumbnailMap[category] || '/img/tutorials/default.svg';
}

// 根据分类获取教程
export async function getTutorialsByCategory(category: string): Promise<TutorialData[]> {
  const allTutorials = await getAllTutorials();
  if (category === 'all') {
    return allTutorials;
  }
  return allTutorials.filter(tutorial => tutorial.category === category);
}

// 搜索教程
export async function searchTutorials(query: string): Promise<TutorialData[]> {
  const allTutorials = await getAllTutorials();
  const lowercaseQuery = query.toLowerCase();
  
  return allTutorials.filter(tutorial => 
    tutorial.title.toLowerCase().includes(lowercaseQuery) ||
    tutorial.description.toLowerCase().includes(lowercaseQuery) ||
    tutorial.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// 获取最新教程
export async function getLatestTutorials(limit: number = 4): Promise<TutorialData[]> {
  const allTutorials = await getAllTutorials();
  return allTutorials.slice(0, limit);
}