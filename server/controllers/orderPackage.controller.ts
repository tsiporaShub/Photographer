import { Request, Response } from 'express';

import express from 'express';
const app = express();

import bodyParser from 'body-parser';

import orderPackage_model from '../models/orderPackage.model';

// import { getAllPhotographyPackages, addPhotographyPackage, updatePhotographyPackage, deletePhotographyPackage } from '../services/photographyPackage.service'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


import date from 'date-and-time';
const _date = date.compile('YYYY/MM/DD')
const hour = date.compile('hh:mm')

async function requireOorderPackage() {

    app.post('/a', async (req: Request, res: Response) => {
        // try {
            // const data = JSON.parse(JSON.stringify(req.body));
            // const newPhotographyPackage = {
            //     id: data.id,
            //     type: data.type,
            //     moneyToHour: data.moneyToHour,
            // }
            // const PhotographyPackages = await orderPackage_model.find();
            // if (PhotographyPackages.length === 0) {
            //     newPhotographyPackage.id = 0;
            // }
            // else {
            //     newPhotographyPackage.id = (PhotographyPackages[PhotographyPackages.length - 1]).id + 1;
            // }
            console.log(date.isValid('2020/02/009fvgfg01', _date));
            
            await orderPackage_model.insertMany({
                id: 0,
                packageId: 0,
                date: date.preparse('2020/02/009fvgfg01', 'YYYY/MM/DD'),
                beginingHour: '135666גג30',
                endHour: '14:00',
            });

            console.log(await orderPackage_model.findOne({ beginingHour:'13:30' }) );
            


            res.send('aaaaa')
        //     res.send('Add new  photography package succeeded');
        // } catch (err) {
        //     res.status(409).send('error...')
        // }
    })

    // app.get('/PhotographyPackage/getAll', async (req: Request, res: Response) => {
    //     await getAllPhotographyPackages(req, res);
    // });


    // app.post('/PhotographyPackage/add', async (req: Request, res: Response) => {
    //     await addPhotographyPackage(req, res);
    // })


    // app.put('/PhotographyPackage/update', async (req: Request, res: Response) => {
    //     await updatePhotographyPackage(req, res);
    // })


    // app.delete('/PhotographyPackage/delete/:id', async (req: Request, res: Response) => {
    //     await deletePhotographyPackage(req, res);
    // })
}

requireOorderPackage()

export default app;