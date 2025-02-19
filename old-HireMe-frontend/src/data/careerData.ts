// import { JobTrend, SkillDemand, SalaryRange, CareerPath, SkillCorrelation } from '../types/career';
import { JobTrend, SkillDemand, SalaryRange, CareerPath, SkillCorrelation } from '../types/career';

export const jobTrends: JobTrend[] = [
  { 
    field: 'AI/ML',
    jobs: 150000,
    growth: 35,
    avgSalary: 130000,
    subFields: ['Computer Vision', 'NLP', 'Robotics']
  },
  { 
    field: 'Cloud Computing',
    jobs: 180000,
    growth: 28,
    avgSalary: 125000,
    subFields: ['AWS', 'Azure', 'GCP']
  },
  { 
    field: 'Cybersecurity',
    jobs: 165000,
    growth: 32,
    avgSalary: 120000,
    subFields: ['Network Security', 'Ethical Hacking', 'Security Architecture']
  },
  { 
    field: 'Data Science',
    jobs: 140000,
    growth: 30,
    avgSalary: 115000,
    subFields: ['Big Data', 'Analytics', 'Data Engineering']
  },
  { 
    field: 'DevOps',
    jobs: 130000,
    growth: 25,
    avgSalary: 110000,
    subFields: ['CI/CD', 'Infrastructure as Code', 'Monitoring']
  },
  { 
    field: 'Blockchain',
    jobs: 80000,
    growth: 22,
    avgSalary: 105000,
    subFields: ['Smart Contracts', 'DeFi', 'Web3']
  },
];

export const skillDemands: SkillDemand[] = [
  { name: 'Python', value: 85, category: 'technical' },
  { name: 'JavaScript', value: 80, category: 'technical' },
  { name: 'Cloud Platforms', value: 75, category: 'technical' },
  { name: 'Problem Solving', value: 90, category: 'soft' },
  { name: 'Communication', value: 85, category: 'soft' },
  { name: 'Project Management', value: 70, category: 'business' },
  { name: 'Data Analysis', value: 78, category: 'technical' },
  { name: 'Leadership', value: 65, category: 'soft' },
];

export const salaryRanges: SalaryRange[] = [
  { role: 'Software Engineer', junior: 70000, mid: 100000, senior: 150000 },
  { role: 'Data Scientist', junior: 75000, mid: 110000, senior: 160000 },
  { role: 'DevOps Engineer', junior: 80000, mid: 115000, senior: 165000 },
  { role: 'Product Manager', junior: 85000, mid: 120000, senior: 180000 },
];

export const careerPathData: CareerPath = {
  name: "Technology Careers",
  children: [
    {
      name: "Software Development",
      children: [
        { name: "Frontend", value: 40 },
        { name: "Backend", value: 45 },
        { name: "Full Stack", value: 50 },
        { name: "Mobile", value: 35 }
      ]
    },
    {
      name: "Data",
      children: [
        { name: "Data Science", value: 42 },
        { name: "Data Engineering", value: 38 },
        { name: "Analytics", value: 35 }
      ]
    },
    {
      name: "Infrastructure",
      children: [
        { name: "DevOps", value: 40 },
        { name: "Cloud", value: 45 },
        { name: "Security", value: 38 }
      ]
    }
  ]
};

export const skillCorrelations: SkillCorrelation[] = [
  {
    skill: "Machine Learning",
    category: "AI",
    percentage: 30,
    relatedSkills: ["Python", "Statistics", "Deep Learning"]
  },
  {
    skill: "Cloud Architecture",
    category: "Infrastructure",
    percentage: 25,
    relatedSkills: ["AWS", "Kubernetes", "Terraform"]
  },
  {
    skill: "Full Stack Development",
    category: "Development",
    percentage: 20,
    relatedSkills: ["JavaScript", "React", "Node.js"]
  },
  {
    skill: "Data Engineering",
    category: "Data",
    percentage: 15,
    relatedSkills: ["SQL", "Python", "Big Data"]
  },
  {
    skill: "DevOps",
    category: "Infrastructure",
    percentage: 10,
    relatedSkills: ["CI/CD", "Docker", "Git"]
  }
];