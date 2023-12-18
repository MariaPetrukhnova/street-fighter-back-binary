import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const validateName = (name) => {
  const fighterName = String(name).trim();
  return (fighterName.length > 0)
}

const validateHealth = (health) => {
  if (!health || (health < 80 || health > 120) || typeof health !== 'number') {
      return false;
  }
  return true;
}


const validatePower = (power) => {
  if (!power || (power < 1 || power > 100) || typeof power !== 'number') {
      return false;
  }
  return true;
}

const validateDefense = (defense) => {
  const defenseNum = Number(defense);
  if (!defenseNum || (defenseNum < 1 || defenseNum > 10) || typeof defenseNum !== 'number') {
      return false;
  }
  return true;
}

const checkOtherFields = (fighter) => {
  for (let key in fighter) {
    if (!FIGHTER.hasOwnProperty(key) || key === "id") {
      return key
    };
  };
  return false;
}

const checkEmptyFields = (fighter) => {
  for (let key in fighter) {
      if (!fighter[key]) return key;
  }
  return false;
}

const checkName = (name) => {
  return fighterService.searchFighterByName(name);
}


const validateFighter = (req) => {
  const { name, health, power, defense} = req.body;

  if (checkOtherFields(req.body)) {
    throw Error('Excess fields')
  } else if (checkEmptyFields(req.body)) {
    throw Error('Missing necessary fields')
  }  else if (name && !validateName(name)) {
    throw Error('Name can not be empty')
  } else if (power && !validatePower(power)) {
    throw Error('Power must be a number from 1 to 100')
  } else if (health && !validateHealth(health)) {
    throw Error('Health must be a number from 80 to 120')
  } else if (defense && !validateDefense(defense)) {
    throw Error('Defense must be a number from 1 to 10')
  } else if (name && checkName(name)) {
    throw Error('This name is already in use.');
  }
  return req.body;
}

const createFighterValid = (req, res, next) => {
  const {name, power, defense} = req.body;

  if (!name || !power || !defense) {
    res.status(400)
    res.err = Error('Missing necessary fields');
  }

  try {
    validateFighter(req);
  } catch (err) {
      res.err = err;
  } finally {
    next();
  };
}

const updateFighterValid = (req, res, next) => {
  const { name, health, power, defense} = req.body;
  if (Object.keys(req.body).length < 1) {
    res.status(400);
    res.err = Error('It should be at least one field to update');
  } else {
    try {
      // validateFighter(req);

      if (checkOtherFields(req.body)) {
        throw Error('Excess fields')
      } else if (checkEmptyFields(req.body)) {
        throw Error('Missing necessary fields')
      }  else if (name && !validateName(name)) {
        throw Error('Name can not be empty')
      } else if (power && !validatePower(power)) {
        throw Error('Power must be a number from 1 to 100')
      } else if (health && !validateHealth(health)) {
        throw Error('Health must be a number from 80 to 120')
      } else if (defense && !validateDefense(defense)) {
        throw Error('Defense must be a number from 1 to 10')
      } else if (name && checkName(name)) {
        throw Error('This name is already in use.');
      }
      return req.body;
    } catch (err) {
      if(err) {
        res.err = err;
      } else if (!fighterService.searchFighter({id: req.params.id})) {
        res.err = Error(`Fighter with id ${req.params.id} not found`);
        res.err.status = 404;
    }
    } finally {
      next();
    };
}
};

export { createFighterValid, updateFighterValid };
