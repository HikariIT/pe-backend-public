import { opinionsController } from '../controllers';
import { Router } from 'express'

export const opinionsRouter = Router();

opinionsRouter.get('/', opinionsController.getAllOpinionIds);
opinionsRouter.get('/:opinion_id', opinionsController.getOpinionFromId);
opinionsRouter.delete('/:opinion_id', opinionsController.removeOpinion);
opinionsRouter.get('/teachers/:teacher_id', opinionsController.getOpinionIdsForTeacher);
opinionsRouter.post('/teachers/:teacher_id', opinionsController.createOpinion);
opinionsRouter.get('/students/:student_id', opinionsController.getOpinionIdsForStudent);
