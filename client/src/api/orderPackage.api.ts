import axios from 'axios';
import { domain } from '../config';
import { OrderPackage } from '../interfaces/orderPackage.interface';

export const addOrderPackage = async (data: OrderPackage) => {
    const token = sessionStorage.getItem('token');

    try {
        const response = await axios.post(`${domain}/OrderPackage`, data, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in API request of adding an order package', error);
        throw error;
    }
}
