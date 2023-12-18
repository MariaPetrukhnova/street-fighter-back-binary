import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get('/', (req, res, next) => {

  try {
    res.data = userService.getUsers();

  } catch (error) {
    res.err = error;

  } finally {
    next();

}
}, responseMiddleware);

router.get('/:id', (req, res, next) => {

  try {
    res.data = userService.getUser(req.params.id);

  } catch (error) {
    res.err = error;

  } finally {
    next();
    
  }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
  try {
    if (!res.err) {
      res.data = userService.create({...req.body});
    }
    
  } catch (error) {
    res.err = error;
  } finally {
    next();

  }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {

  try {
    if (!res.err) {
      res.data = userService.update( req.params.id, req.body);
    }
  } catch (error) {
    res.err = error;

  } finally {
    next();

  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {

  try {
    const id = req.params.id;
    res.data = userService.delete({id: id});
  } catch (error) {
    res.err = error;

  } finally {
    next();

  }
}, responseMiddleware);


export { router };
