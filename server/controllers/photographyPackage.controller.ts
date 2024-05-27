import { Request, Response } from 'express';

import express from 'express';
const app = express();

import bodyParser from 'body-parser';

import { getAllPhotographyPackages, addPhotographyPackage, updatePhotographyPackage, deletePhotographyPackage } from '../services/photographyPackage.service'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


export const get = async (req: Request, res: Response) => {    
    await getAllPhotographyPackages(req, res);
};

export const post = async (req: Request, res: Response) => {
    await addPhotographyPackage(req, res);
}

export const put = async (req: Request, res: Response) => {
    await updatePhotographyPackage(req, res);
}

export const deleteOne = async (req: Request, res: Response) => {
    await deletePhotographyPackage(req, res);
}

export default app;