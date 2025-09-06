import {gql} from "@apollo/client";

export interface Career {
    predictedCareer: string;
    careerDescription: string;
    careerOpportunities: string;
    slMonthlySalary: string;
    slLocation: string;
    foreignMonthlySalary: string;
    foreignLocation: string;
    workType: string;
    score: number;
    skills: string[];
}

export interface Course {
    level: any;
    id: string;
    title: string;
    description: string;
    rating: number;
    platform: string;
    price: number;
    isFree: boolean;
    duration: string;
    enrollmentCount: number;
    reviewCount: number;
    url: string;
}

export interface Career {
    predictedCareer: string;
    careerDescription: string;
    educationRequirement: string; // <-- Add this line
    careerOpportunities: string;
    foreignLocation: string;
    foreignMonthlySalary: string;
    slLocation: string;
    slMonthlySalary: string;
    workType: string;
    skills: string[];
}

// models/career.ts
export interface CareerDetail {
    predictedCareer: string;
    careerDescription: string;
    educationRequirement: string;
    skills: string[];
    careerOpportunities: string;
    slMonthlySalary: string;
    slLocation: string;
    foreignMonthlySalary: string;
    foreignLocation: string;
    workType: string;
}


export interface Course {
    title: string;
    url: string;
    platform: string;
    rating: number;
    reviewCount: number;
    price?: number;
    level: string;
    duration: string;
    language: string;
    isFree: boolean;
    instructor: string;
    enrollmentCount: number;
    createdAt: string;
    certificate: boolean;
}


export const GET_CAREER_DETAILS = gql`
    query GetCareerDetailsBySubjects($subjects: [String!]!) {
        getCareerDetailsBySubjects(subjects: $subjects) {
            predictedCareer {
                predictedCareer
                score
                careerDescription
            }
            relatedCourses {
                title
                url
                platform
                rating
                reviewCount
                price
                level
                duration
                language
                isFree
                instructor
                enrollmentCount
                createdAt
                certificate
            }
        }
    }
`;