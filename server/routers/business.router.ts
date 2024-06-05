import express from 'express';
import { get , put } from '../controllers/business.controller';

const router =express.Router();

router.get('/business',get);

router.put('/business',put);

export default router;
