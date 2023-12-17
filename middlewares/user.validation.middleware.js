import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const checkNecessaryFields = (user) => {
  for (let key in USER) {
    if (!(key in user) && key !== 'id') return key;
  }
  return true;
}

const checkOtherFields = (user) => {
  for (let key in user) {
    if (!USER.hasOwnProperty(key)) {
      return key
    };
  };
  return '';
}

const checkEmptyFields = (user) => {
  for (let key in user) {
      if (!user[key]) return key;
  }
  return '';
}

const validateEmail = (email) => {
  const regExp = /^\w+([\.-]?\w+)*@gmail.com/;
  return regExp.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const regExp = /\+380\d{9}/;
  return regExp.test(phoneNumber);
}

const validatePassword = (password) => {
  const regExp = /.{3}/;
  return regExp.test(password);
}

const validateUser = (user) => {
  console.log('Validate user', user)
  const {id, firstName, lastName, email, phoneNumber, password} = user;

  const necessaryFields = checkNecessaryFields(user);
  const otherFields = checkOtherFields(user);
  const emptyFields = checkEmptyFields(user);
  const correctEmail = validateEmail(email);
  const correctPhoneNumber = validatePhoneNumber(phoneNumber);
  const correctPassword = validatePassword(password);

  if (!necessaryFields) {
    return Error(`Missing fields`);
  } else if (otherFields) {
    return Error(`Exess fields`);
  } else if (emptyFields) {
    return Error(`Empty fields ${emptyFields}`);
  } else if (email && !correctEmail) {
    return Error(`Incorrect email`);
  } else if (phoneNumber && !correctPhoneNumber) {
    return Error(`Incorrect phone number`);
  } else if (password && !correctPassword) {
    return Error(`Incorrect password`);
  } else if (id) {
    return Error(`Id field should not be in requests`);
  } 

  return user;
}

const loginUserValidate = (req, res, next) => {

  const {email, password} = req.body;
  const correctEmail = validateEmail(email);
  const correctPassword = validatePassword(password);

  if (!correctEmail && correctPassword) {
    res.err = Error(`Incorrect email`);
    res.err.status = 400;
  } else if (correctEmail && !correctPassword) {
    res.err = Error(`Incorrect password`);
    res.err.status = 400;
  } else if (!email || !password) {
    res.err = Error(`Missing fields`);
    res.err.status = 400;
  } 

  next();
}


const createUserValid = (req, res, next) => {
  const validation = validateUser(req.body, 'create')

  if (validation instanceof Error) {
    res.err = validation;
    res.err.status = 400;
  } else if (userService.search({email: req.body.email})) {
    res.err = Error(`User with this email already exists`);
    res.err.status = 400;
  } else if (userService.search({phoneNumber: req.body.phoneNumber})) {
    res.err = Error(`User with this phone number already exists`);
    res.err.status = 400;
  }
  next();
};

const updateUserValid = (req, res, next) => {
  const validation = validateUser(req.body, 'update')

  console.log(validation)

  if (validation instanceof Error) {
    res.err = `${validation} 1st val`;
    res.err.status = 400;
  } else if (!userService.search({id: req.params.id})) {
    res.err = Error(`User does not exist`);
    res.err.status = 400;
  } else if (userService.search({email: req.body.email})) {
    res.err = Error(`User with this email already exists. You can not use the same`);
    res.err.status = 400;
  } else if (userService.search({phoneNumber: req.body.phoneNumber})) {
    res.err = Error(`User with this phone number already exists. You can not use the same`);
    res.err.status = 400;
  }
  next();
};


export { createUserValid, updateUserValid, validateUser, loginUserValidate };
