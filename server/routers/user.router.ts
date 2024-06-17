import express from 'express';
import checkUserToken from '../middlewares/aouthenticatiom_admin.middleware';
import { get , signup , signin , put , deleteOne } from '../controllers/user.controller';

const router =express.Router();

router.post('/signup',signup);

router.post('/signin',signin);

router.get('/user',get);

router.put('/user/:id',put);

router.delete('/user/:id',checkUserToken,deleteOne);

export default router;