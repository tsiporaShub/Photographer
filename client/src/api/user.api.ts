import axios from 'axios';
import { domain } from '../config';
import { SignInData, User } from "../interfaces/user.interface";

export const SignIn = async (data: SignInData) => {
    try {
        const response = await axios.post(`${domain}/signin`, {
            user: data,
        })
        return response.data;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}

export const SignUp = async (data: User) => {
    try {
        const response = await axios.post(`${domain}/signun`, {
            user: data,
        })
        return response.data;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}