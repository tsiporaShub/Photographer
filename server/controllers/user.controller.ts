import { Request, Response } from 'express';

import express from 'express';
const app = express();

import bodyParser from 'body-parser';

import { getAllUsers, addUser, updateUser, deleteUser } from '../services/user.service';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


export const get = async (req: Request, res: Response) => {    
    await getAllUsers(req, res);
};

export const post = async (req: Request, res: Response) => {
    await addUser(req, res);
}

export const put = async (req: Request, res: Response) => {
    await updateUser(req, res);
}

export const deleteOne = async (req: Request, res: Response) => {
    await deleteUser(req, res);
}
