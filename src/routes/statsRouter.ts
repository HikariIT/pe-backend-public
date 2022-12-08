import { statsController } from '../controllers';
import { Router } from 'express'

export const statsRouter = Router();

statsRouter.get('/', statsController.getStats);