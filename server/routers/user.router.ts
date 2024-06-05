import express from 'express';
import { get , post , put , deleteOne } from '../controllers/user.controller';

const router =express.Router();

router.get('/user',get);

router.post('/user',post);

router.put('/user/:id',put);

router.delete('/user/:id',deleteOne);

export default router;