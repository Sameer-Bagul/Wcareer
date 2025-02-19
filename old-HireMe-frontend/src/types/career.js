export interface JobTrend {
  field: string;
  jobs: number;
  growth: number;
  avgSalary: number;
  subFields?: string[];
}

export interface SkillDemand {
  name: string;
  value: number;
  category: 'technical' | 'soft' | 'business';
}

export interface SalaryRange {
  role: string;
  junior: number;
  mid: number;
  senior: number;
}

export interface CareerPath {
  name: string;
  children?: CareerPath[];
  value?: number;
}

export interface SkillCorrelation {
  skill: string;
  category: string;
  percentage: number;
  relatedSkills: string[];
}