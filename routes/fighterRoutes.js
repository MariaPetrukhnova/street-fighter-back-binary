import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid
} from "../middlewares/fighter.validation.middleware.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.data = fighterService.getFighters();

  } catch (error) {
    res.err = error;

  } finally {
    next();

}
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  try {
    res.data = fighterService.getOneFighter(req.params.id);

  } catch (error) {
    res.err = error;
  } finally {
  next();
  
}
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  try {
    if (!res.err) {
      const fighter = {...req.body};
      if (!fighter.health) {
        fighter.health = 100;
      }
      res.data = fighterService.createFighter(fighter);
    }
  } catch (error) {
    res.err = error;
  } finally {
  next();
  
}
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
  try {
    if (!res.err) {
      res.data = fighterService.updateFighter( req.params.id, req.body);
    }
  } catch (error) {
    res.err = error;

  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    res.data = fighterService.deleteFighter(req.params.id);
    res.status(204)
  } catch (error) {
    res.err = error;

  } finally {
    next();

  }
}, responseMiddleware)

export { router };
