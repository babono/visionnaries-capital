export interface Project {
  id: string;
  title: string;
  description: string;
  capitalRequirement?: string;
  ebitdaRange?: string;
  category: 'Growth Capital' | 'Merger & Acquisition' | 'IPO' | 'Valuation Advisory';
  status: 'Active' | 'Completed' | 'In Progress';
  coverImage?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface SuccessStory {
  id: string;
  title: string;
  clientIndustry: string;
  clientObjective: string;
  approach: string;
  result: string;
  clientFeedback: string;
  scopeOfWork: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageContent {
  id: string;
  title: string;
  content: NotionBlock[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  content: string | number | boolean | object | null;
  children?: NotionBlock[];
}

export interface NavigationItem {
  title: string;
  href: string;
  children?: NavigationItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image?: string;
  linkedIn?: string;
  email?: string;
} 