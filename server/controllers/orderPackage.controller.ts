import { Request, Response } from 'express';

import express from 'express';
const app = express();

import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import { getAllOrderPackages, addOrderPackage, updateOrderPackage, deleteOrderPackage } from '../services/orderPackage.service';


export const get = async (req: Request, res: Response) => {    
    await getAllOrderPackages(req, res);
};

export const post = async (req: Request, res: Response) => {
    await addOrderPackage(req, res);
}

export const put = async (req: Request, res: Response) => {
    await updateOrderPackage(req, res);
}

export const deleteOne = async (req: Request, res: Response) => {
    await deleteOrderPackage(req, res);
}
