// TypeScript declaration for tutorials.json
declare module '../data/tutorials.json' {
  interface Tutorial {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    readTime: number;
    date: string;
    thumbnail: string;
    url: string;
    tags: string[];
    slug: string;
    filePath: string;
  }

  interface TutorialsData {
    tutorials: Tutorial[];
    stats: {
      total: number;
      byCategory: Record<string, number>;
      lastUpdated: string;
    };
  }

  const data: TutorialsData;
  export default data;
}