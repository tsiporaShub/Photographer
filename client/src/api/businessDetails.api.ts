import axios from 'axios';
import { domain } from '../config';
import { BusinessDetails } from '../interfaces/businessDetails.interface';

const token = sessionStorage.getItem('token');

export const getBusinessDetails = async () => {
    try {
        const response = await axios.get(`${domain}/business`);
        return response.data;
    } catch (error) {
        console.error('Error in API request for business details', error);
        throw error;
    }
}

export const editBusinessDetails = async (updatedDetails: BusinessDetails) => {
    try {
        const response = await axios.put(`${domain}/business`, updatedDetails, {
            headers: {
                'Content-Type': 'application/json',
                "token": token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error editing business details:', error);
        throw new Error('Failed to edit business details');
    }
}

