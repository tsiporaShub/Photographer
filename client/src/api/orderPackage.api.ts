import axios from 'axios';
import { domain } from '../config';
import { OrderPackage } from "../interfaces/orderPackage.interface";

export const addOrder = async (order: OrderPackage) => {
    // try {
    //     const response = await axios.post(`http://localhost:3000/signin`, data, {
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       });
    //     return response.data;
    // } catch (error) {
    //     console.error('error in api request of users', error);
    //     throw error;
    // }
}