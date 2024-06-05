import { Request, Response } from 'express';

import express from 'express';
const app = express();

import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

import { getBusinessDetails, updateBusinessDetails } from '../services/business.service';


export const get = async (req: Request, res: Response) => {    
    await getBusinessDetails(req, res);
};

export const put = async (req: Request, res: Response) => {
    await updateBusinessDetails(req, res);
}
