import express from 'express';
import checkUserToken from '../middlewares/aouthenticatiom_admin.middleware';
import { get , post , put , deleteOne } from '../controllers/photographyPackage.controller';

const router = express.Router();

router.get('/PhotographyPackage',get);

router.post('/PhotographyPackage',checkUserToken,post);

router.put('/PhotographyPackage/:id',checkUserToken,put);

router.delete('/PhotographyPackage/:id',checkUserToken,deleteOne);

export default router;