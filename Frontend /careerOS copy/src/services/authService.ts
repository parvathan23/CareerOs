import { ApolloError } from '@apollo/client';
import { client } from '@/lib/apolloClient';
import { REGISTER_MUTATION, LOGIN_MUTATION, ME_QUERY } from '@/graphql/registerMutation';

// Interfaces
interface RegisterInput {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

interface LoginInput {
    email: string;
    password: string;
}

interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

interface RegisterResponse {
    register: {
        user: User;
    };
}

interface LoginResponse {
    tokenAuth: {
        token: string;
        refreshToken: string;
        refreshExpiresIn: number;
        payload: Record<string, unknown>;
    };
}

interface MeResponse {
    me: User;
}

// 🔐 Register User
export const registerUser = async (input: RegisterInput): Promise<User | null> => {
    try {
        const { data } = await client.mutate<RegisterResponse>({
            mutation: REGISTER_MUTATION,
            variables: input,
        });
        return data?.register?.user ?? null;
    } catch (error) {
        if (error instanceof ApolloError) {
            console.error('Register Apollo Error:', error.message);
        } else {
            console.error('Register Unknown Error:', error);
        }
        throw error;
    }
};

// 🔐 Login User using fetch
export const loginUser = async ({ email, password }: LoginInput): Promise<LoginResponse['tokenAuth'] | null> => {
    try {
        const response = await fetch("http://localhost:8000/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
                    mutation Login($email: String!, $password: String!) {
                        tokenAuth(email: $email, password: $password) {
                            token
                            refreshToken
                            refreshExpiresIn
                            payload
                        }
                    }
                `,
                variables: { email, password },
            }),
        });

        const result = await response.json();
        const tokenAuth = result.data?.tokenAuth;

        if (tokenAuth?.token && tokenAuth?.refreshToken) {
            localStorage.setItem("token", tokenAuth.token);
            localStorage.setItem("refreshToken", tokenAuth.refreshToken);
        }

        return tokenAuth ?? null;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

// 👤 Get Current User
export const getMe = async (): Promise<User | null> => {
    try {
        const { data } = await client.query<MeResponse>({
            query: ME_QUERY,
            fetchPolicy: 'no-cache',
        });
        return data?.me ?? null;
    } catch (error) {
        if (error instanceof ApolloError) {
            console.error('Me Apollo Error:', error.message);
        } else {
            console.error('Me Unknown Error:', error);
        }
        throw error;
    }
};

// 🚪 Logout User
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    console.log("✅ User logged out successfully");
};