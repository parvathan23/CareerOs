// src/graphql/queries/getAllSubjects.ts
import { gql } from '@apollo/client';

export const GET_ALL_SUBJECTS = gql`
    query {
        getAllSubjects
    }
`;