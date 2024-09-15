import axios from 'axios';
import { domain } from '../config';

export const getBusinessDetails = async () => {
    try {
        const response = await axios.get(`${domain}/business`)
        return response.data;
    } catch (error) {
        console.error('error in api request of business details', error);
        throw error;
    }
}