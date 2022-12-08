import { teachersController } from '../controllers';
import { Router } from 'express'

export const teachersRouter = Router();

teachersRouter.get('/', teachersController.getTeacherIds);
teachersRouter.get('/:teacher_id', teachersController.getUserFromTeacherId);