import axios from 'axios';
import { domain } from '../config';
import { OrderPackage } from '../interfaces/orderPackage.interface';

export const addOrderPackage = async (data: OrderPackage) => {
    try {
        const response = await axios.post(`${domain}/OrderPackage`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data;
    } catch (error) {
        console.error('error in api request of add order package', error);
        throw error;
    }
}