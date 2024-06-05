import express from 'express';
import { get , signup , signin , put , deleteOne } from '../controllers/user.controller';

const router =express.Router();

router.get('/user',get);

router.post('/user/signup',signup);

router.post('/user/signin',signin);

router.put('/user/:id',put);

router.delete('/user/:id',deleteOne);

export default router;