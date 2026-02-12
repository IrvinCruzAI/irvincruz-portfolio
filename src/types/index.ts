export interface Business {
  name: string;
  url: string;
  description: string;
  cta: string;
  ctaUrl: string;
}

export interface SocialProof {
  name: string;
  logo: string;
  description?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  type: 'education' | 'work' | 'achievement' | 'venture';
}

export interface CaseStudy {
  title: string;
  company: string;
  outcomes: string[];
  description: string;
  technologies: string[];
}

export interface Project {
  name: string;
  description: string;
  status: 'Live' | 'Beta' | 'In Development';
  githubUrl?: string;
  hostedUrl?: string;
  image?: string;
  technologies: string[];
  keyFeatures: string[];
  tags: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  followers?: string;
}

export interface Config {
  personal: {
    name: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    phone?: string;
    photo: string;
    website?: string;
  };
  businesses: Business[];
  projects?: Project[];
  caseStudies?: CaseStudy[];
  socialProof: SocialProof[];
  timeline: TimelineItem[];
  socialLinks: SocialLink[];
  leadMagnet: {
    title: string;
    tagline?: string;
    description: string;
    cta: string;
    type: 'newsletter' | 'checklist' | 'call';
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  blogUrl?: string;
}