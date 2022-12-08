import { Router } from 'express'
import { usersController } from '../controllers'
import { userAuth } from '../middlewares'
import tokenAuth from "../middlewares/tokenAuth";

export const usersRouter = Router();

usersRouter.post('/signup', userAuth.saveUser, usersController.signUp);
usersRouter.post('/login', usersController.signIn);
usersRouter.delete('/logout', usersController.signOut);
usersRouter.get('/:user_id', tokenAuth, usersController.getUser);