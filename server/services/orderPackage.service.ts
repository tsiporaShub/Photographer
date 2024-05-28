import { Request, Response } from 'express';
import orderPackage_model from '../models/orderPackage.model';
import photographyPackage_model from '../models/photographyPackage.model';

import date from 'date-and-time';
const datePattern = date.compile('YYYY/MM/DD')
const hourPattern = date.compile('hh:mm')

export const getAllOrderPackages = async function (req: Request, res: Response) {
    const orderPackages = await orderPackage_model.find();
    res.send(orderPackages);
}


export const addOrderPackage = async function (req: Request, res: Response) {
    try {
        const data = req.body;
        const newOrderPackage = {
            id: data.id,
            packageId: data.packageId,
            date: data.date,
            beginingHour: data.beginingHour,
            endHour: data.endHour,
        }
        await isCorrectorderPackage(newOrderPackage)
        const orderPackages = await orderPackage_model.find();
        if (orderPackages.length === 0) {
            newOrderPackage.id = 0;
        }
        else {
            newOrderPackage.id = (orderPackages[orderPackages.length - 1]).id + 1;
        }
        await orderPackage_model.insertMany(newOrderPackage);
        res.send('Add new  order package succeeded');
    } catch (err) {
        res.status(409).send(''+err)
    }
}


export const updateOrderPackage = async function (req: Request, res: Response) {

}


export const deleteOrderPackage = async function (req: Request, res: Response) {

}

const isCorrectorderPackage =async function (orderPackage:any) {
    if( isNaN(orderPackage.packageId) ){
        throw new Error("invalid packageId");
    }
    if(!await photographyPackage_model.findOne({"id":orderPackage.packageId})){
        throw new Error("packageId not found");
    }
    if(!date.isValid(orderPackage.date, datePattern)){
        throw new Error('invalid date');
    }
    if(!date.isValid(orderPackage.beginingHour, hourPattern)){
        throw new Error("invalid beginingHour");  
    }
    if(!date.isValid(orderPackage.endHour, hourPattern)){
        throw new Error("invalid endHour");
    }
    if(!(orderPackage.endHour>orderPackage.beginingHour)){
        throw new Error("beginingHour big from endHour");
    }
    if(orderPackage.date<date.format(new Date(),datePattern)){
        throw new Error("past date");
    }
    const allOrdersInThisDate=await orderPackage_model.find({"date":orderPackage.date});
    allOrdersInThisDate.sort((a:any,b:any)=>{return a.beginingHour<b.beginingHour?-1:1});
    allOrdersInThisDate.forEach((order:any) => {
        if(order['endHour']>orderPackage.beginingHour){
            if(order['beginingHour']<orderPackage.endHour){
                throw new Error("the time is not available");
            }
        }
    });
}