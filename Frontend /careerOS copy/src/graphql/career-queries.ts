// graphql/career-queries.ts
import { gql } from '@apollo/client';

export const PREDICT_CAREER = gql`
    mutation PredictCareer($subjects: [String]!) {
        predictCareer(subjects: $subjects) {
            predictedCareer
            careerDescription
            careerOpportunities
            educationRequirement
            slMonthlySalary
            slLocation
            foreignMonthlySalary
            foreignLocation
            workType
            skills
            score
        }
    }
`;


export const GET_CAREER_DETAILS = gql`
    query GetCareerDetails($names: [String!]!) {
        getCareerDetails(names: $names) {
            predictedCareer
            careerDescription
            educationRequirement
            careerOpportunities
            foreignLocation
            foreignMonthlySalary
            slLocation
            slMonthlySalary
            workType
            skills
        }
    }
`;

export const GET_CAREER_DETAIL_BY_NAME = gql`
    query GetCareerDetailByName($careerName: String!) {
        getCareerDetailByName(careerName: $careerName) {
            predictedCareer
            careerDescription
            educationRequirement
            skills
            careerOpportunities
            slMonthlySalary
            slLocation
            foreignMonthlySalary
            foreignLocation
            workType
        }
    }
`;


export const GET_COURSES_BY_CAREER = gql`
  query GetCoursesByCareer($keyword: String!) {
    getCoursesByCareer(keyword: $keyword) {
      title
      reviewCount
      price
      rating
      platform
      level
      language
      isFree
      instructor
      enrollmentCount
      duration
      createdAt
      certificate
      url
    }
  }
`;