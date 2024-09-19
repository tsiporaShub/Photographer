import axios from 'axios';
import { domain } from '../config';

export const getPhotographyPackages = async () => {
    try {
        const response = await axios.get(`${domain}/PhotographyPackage`)
        return response.data;
    } catch (error) {
        console.error('error in api request of photography package', error);
        throw error;
    }
}