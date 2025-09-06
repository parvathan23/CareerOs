export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  selected?: boolean;
}

export interface Career {
  id: string;
  title: string;
  tagline: string;
  description: string;
  salaryLocal: string;
  salaryForeign: string;
  workType: string;
  location: string;
  skills: string[];
  growthRate: string;
  demandLevel: 'High' | 'Medium' | 'Low';
  experience: string;
}

export interface Course {
    url: string;
  id: string;
  title: string;
  platform: string;
  rating: number;
  reviewCount: number;
  price: number;
  isFree: boolean;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  instructor: string;
  description: string;
  curriculum: string[];
  enrollmentCount: number;
  language: string;
  certificate: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  selectedSubjects: string[];
  predictedCareers: Career[];
}