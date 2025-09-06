import { Subject, Career, Course } from '@/types';

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '🧮',
    color: 'bg-blue-500'
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    color: 'bg-purple-500'
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    color: 'bg-green-500'
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    color: 'bg-teal-500'
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    icon: '💻',
    color: 'bg-indigo-500'
  },
  {
    id: 'commerce',
    name: 'Commerce',
    icon: '💼',
    color: 'bg-orange-500'
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: '📈',
    color: 'bg-red-500'
  },
  {
    id: 'psychology',
    name: 'Psychology',
    icon: '🧠',
    color: 'bg-pink-500'
  }
];

export const careers: { [key: string]: Career[] } = {
  'mathematics,physics,computer-science': [
    {
      id: 'software-engineer',
      title: 'Software Engineer',
      tagline: 'Build the future with code',
      description: 'Design and develop software applications, systems, and solutions that power the digital world.',
      salaryLocal: '$70,000 - $120,000',
      salaryForeign: '$90,000 - $180,000',
      workType: 'Hybrid/Remote',
      location: 'Global',
      skills: ['Programming', 'Problem Solving', 'System Design', 'Algorithms'],
      growthRate: '+22%',
      demandLevel: 'High',
      experience: '0-2 years'
    }
  ],
  'biology,chemistry': [
    {
      id: 'biomedical-engineer',
      title: 'Biomedical Engineer',
      tagline: 'Engineer solutions for human health',
      description: 'Combine engineering principles with biological sciences to develop medical devices and treatments.',
      salaryLocal: '$60,000 - $95,000',
      salaryForeign: '$75,000 - $130,000',
      workType: 'On-site',
      location: 'Healthcare Facilities',
      skills: ['Biology', 'Engineering', 'Medical Devices', 'Research'],
      growthRate: '+5%',
      demandLevel: 'Medium',
      experience: '2-4 years'
    }
  ],
  'commerce,economics': [
    {
      id: 'financial-analyst',
      title: 'Financial Analyst',
      tagline: 'Navigate the world of finance',
      description: 'Analyze financial data and market trends to guide investment decisions and business strategies.',
      salaryLocal: '$55,000 - $85,000',
      salaryForeign: '$70,000 - $120,000',
      workType: 'Hybrid',
      location: 'Financial District',
      skills: ['Financial Modeling', 'Data Analysis', 'Market Research', 'Excel'],
      growthRate: '+6%',
      demandLevel: 'High',
      experience: '1-3 years'
    }
  ],
  'psychology': [
    {
      id: 'ux-designer',
      title: 'UX Designer',
      tagline: 'Design experiences that matter',
      description: 'Create intuitive and engaging user experiences for digital products and services.',
      salaryLocal: '$65,000 - $105,000',
      salaryForeign: '$80,000 - $140,000',
      workType: 'Hybrid',
      location: 'Tech Companies',
      skills: ['User Research', 'Design Thinking', 'Prototyping', 'Psychology'],
      growthRate: '+13%',
      demandLevel: 'High',
      experience: '1-3 years'
    }
  ]
};

export const courses: Course[] = [
  {
    id: 'cs50',
    title: 'CS50: Introduction to Computer Science',
    platform: 'edX',
    rating: 4.8,
    reviewCount: 15420,
    price: 0,
    isFree: true,
    duration: '12 weeks',
    level: 'Beginner',
    image: '/placeholder-course-1.jpg',
    instructor: 'David Malan',
    description: 'Harvard University\'s introduction to computer science and programming.',
    curriculum: ['Problem Solving', 'C Programming', 'Python', 'Web Development', 'SQL'],
    enrollmentCount: 125000,
    language: 'English',
    certificate: true
  },
  {
    id: 'full-stack-web-dev',
    title: 'The Complete Web Developer Bootcamp',
    platform: 'Udemy',
    rating: 4.6,
    reviewCount: 89230,
    price: 89,
    isFree: false,
    duration: '65 hours',
    level: 'Beginner',
    image: '/placeholder-course-2.jpg',
    instructor: 'Colt Steele',
    description: 'Learn to build websites and web applications from scratch.',
    curriculum: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    enrollmentCount: 450000,
    language: 'English',
    certificate: true
  },
  {
    id: 'data-science-python',
    title: 'Data Science with Python',
    platform: 'Coursera',
    rating: 4.7,
    reviewCount: 23450,
    price: 49,
    isFree: false,
    duration: '8 weeks',
    level: 'Intermediate',
    image: '/placeholder-course-3.jpg',
    instructor: 'Andrew Ng',
    description: 'Master data science fundamentals using Python programming.',
    curriculum: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Machine Learning'],
    enrollmentCount: 78000,
    language: 'English',
    certificate: true
  },
  {
    id: 'financial-modeling',
    title: 'Financial Modeling & Valuation',
    platform: 'Coursera',
    rating: 4.5,
    reviewCount: 12340,
    price: 79,
    isFree: false,
    duration: '6 weeks',
    level: 'Intermediate',
    image: '/placeholder-course-4.jpg',
    instructor: 'Wharton School',
    description: 'Learn financial modeling techniques used by Wall Street professionals.',
    curriculum: ['Excel Modeling', 'DCF Analysis', 'Company Valuation', 'LBO Models'],
    enrollmentCount: 34000,
    language: 'English',
    certificate: true
  },
  {
    id: 'ui-ux-design',
    title: 'Google UX Design Certificate',
    platform: 'Coursera',
    rating: 4.6,
    reviewCount: 45670,
    price: 39,
    isFree: false,
    duration: '6 months',
    level: 'Beginner',
    image: '/placeholder-course-5.jpg',
    instructor: 'Google',
    description: 'Prepare for a career in UX design with Google\'s professional certificate program.',
    curriculum: ['Design Process', 'Wireframing', 'Prototyping', 'User Research', 'Figma'],
    enrollmentCount: 125000,
    language: 'English',
    certificate: true
  },
  {
    id: 'biomedical-engineering',
    title: 'Biomedical Engineering Fundamentals',
    platform: 'MIT xPRO',
    rating: 4.4,
    reviewCount: 8920,
    price: 299,
    isFree: false,
    duration: '10 weeks',
    level: 'Advanced',
    image: '/placeholder-course-6.jpg',
    instructor: 'MIT Faculty',
    description: 'Explore the intersection of engineering and medicine.',
    curriculum: ['Biomechanics', 'Medical Devices', 'Tissue Engineering', 'Biocompatibility'],
    enrollmentCount: 12000,
    language: 'English',
    certificate: true
  }
];