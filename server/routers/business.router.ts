import express from 'express';
import checkUserToken from '../middlewares/aouthenticatiom_admin.middleware';
import { get , put } from '../controllers/business.controller';

const router =express.Router();

router.get('/business',get);

router.put('/business',checkUserToken,put);

export default router;
