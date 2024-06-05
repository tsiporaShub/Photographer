import { Request, Response } from 'express';
import user_model from '../models/user.model';

export const getAllUsers = async function (req: Request, res: Response) {
    const users = await user_model.find();
    res.send(users);
}


export const addUser = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        const newUser = {
            id: data.id,
            name: data.name,
            password: data.password,
            phone:data.phone,
            email:data.email,
            isAdmin:data.isAdmin,
        }
        const users = await user_model.find();
        if (users.length === 0) {
            newUser.id = 0;
        }
        else {
            newUser.id = (users[users.length - 1]).id + 1;
        }
        await user_model.insertMany(newUser);
        res.send('Add new  user succeeded');
    } catch (err) {
        res.status(409).send('error...')
    }
}


export const updateUser = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        const id = req.params.id;
        if (await user_model.findOne({ id }) === null) {
            res.status(404).send('user not found')
            return;
        }
        await user_model.updateOne({
            id
        }, {
            $set: {
                name: data.name,
                password: data.password,
                phone: data.phone,
                email: data.email,
            }
        })
        res.send('Update ' + id + ' succeeded');
    } catch (err) {
        res.status(409).send('error...')
    }
}


export const deleteUser = async function (req: Request, res: Response) {
    try {
        const id = req.params.id;
        if (await user_model.findOne({ id }) === null) {
            res.status(404).send('user package not found')
            return;
        }
        await user_model.deleteOne({ id });
        res.send('Delete ' + id + ' succeeded');
    } catch (err) {
        res.status(409).send('error...');
    }
}
