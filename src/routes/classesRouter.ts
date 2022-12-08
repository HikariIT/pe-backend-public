import { classesController } from '../controllers';
import { Router } from 'express'

export const classesRouter = Router();

classesRouter.get('/', classesController.getAllClassIds);
classesRouter.post('/', classesController.createClass);
classesRouter.get('/:class_id', classesController.getClassFromId);
classesRouter.get('/teacher/:teacher_id', classesController.getClassIdsForTeacher);