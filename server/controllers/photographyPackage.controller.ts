import { Request, Response } from 'express';

const app = require('express').Router();
import bodyParser from 'body-parser';

import { getAllPhotographyPackages, addPhotographyPackage, updatePhotographyPackage, deletePhotographyPackage } from '../services/photographyPackage.service'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function requirePhotographyPackage() {

    app.get('/PhotographyPackage/getAll', async (req: Request, res: Response) => {
        await getAllPhotographyPackages(req, res);
    });


    app.post('/PhotographyPackage/add', async (req: Request, res: Response) => {
        await addPhotographyPackage(req, res);
    })


    app.put('/PhotographyPackage/update', async (req: Request, res: Response) => {
        await updatePhotographyPackage(req, res);
    })


    app.delete('/PhotographyPackage/delete/:id', async (req: Request, res: Response) => {
        await deletePhotographyPackage(req, res);
    })
}

requirePhotographyPackage()

export default app;