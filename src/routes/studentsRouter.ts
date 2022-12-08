import { studentsController } from '../controllers';
import { Router } from 'express'

export const studentsRouter = Router();

studentsRouter.get('/', studentsController.getStudentIds);
studentsRouter.get('/:student_id', studentsController.getUserFromStudentId);