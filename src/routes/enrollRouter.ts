import { enrollController } from '../controllers';
import { Router } from 'express'


export const enrollRouter = Router();

enrollRouter.get('/class/:class_id', enrollController.getAllStudentIdsForClass);
enrollRouter.post('/class/:class_id', enrollController.enrollStudent);
enrollRouter.delete('/class/:class_id', enrollController.cancelEnrollForStudent);
enrollRouter.get('/student/:student_id', enrollController.getAllClassIdsForStudent);