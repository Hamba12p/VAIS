export type ProjectStatus = 'deployed' | 'in-development' | 'blueprint' | 'prototype';

export type CategoryKey =
  | 'civic-government'
  | 'security-intelligence'
  | 'health'
  | 'agriculture'
  | 'education-institutions'
  | 'fintech-payments'
  | 'automotive-iot'
  | 'supply-chain'
  | 'platform';

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: CategoryKey[];
  status: ProjectStatus;
  clientContext: string;
  problem: string;
  solution: string;
  architectureHighlight: string;
  ugandaHooks: string[];
  stack: string[];
  featured: boolean;
  pairedWith?: string;
  pairLabel?: string;
  metrics?: string[];
}

export interface Category {
  key: CategoryKey;
  label: string;
}
