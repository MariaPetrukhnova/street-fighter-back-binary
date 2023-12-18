import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const checkOtherFields = (user) => {
  for (let key in user) {
    if (!USER.hasOwnProperty(key) || key === "id") {
      return key
    };
  };
  return '';
}

const checkEmptyFields = (user) => {
  for (let key in user) {
      let value = user[key].trim();
      if (!value) return key;
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
  const {id, firstName, lastName, email, phoneNumber, password} = user;

  const otherFields = checkOtherFields(user);
  const emptyFields = checkEmptyFields(user);
  const correctEmail = validateEmail(email);
  const correctPhoneNumber = validatePhoneNumber(phoneNumber);
  const correctPassword = validatePassword(password);

  if (otherFields) {
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
  const entryData = userService.search({email: req.body.email.toLowerCase()})

  if (!correctEmail && correctPassword) {
    res.err = Error(`Incorrect email`);
    res.status(400);
  } else if (entryData && entryData.password !== password) {
    res.err = Error(`Incorrect password`);
    res.status(400);
  } else if (!email || !password) {
    res.err = Error(`Missing fields`);
    res.status(400);
  } 

  next();
}


const createUserValid = (req, res, next) => {
  const validation = validateUser(req.body);
  const {firstName, lastName, email, phoneNumber, password} = req.body;

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    res.err = Error(`Missing fields`);
    res.status(400);
  } else if (validation instanceof Error) {
    res.err = validation;
    res.status(400);
  } else if (userService.search({email: req.body.email.toLowerCase()})) {
    res.err = Error(`User with this email already exists`);
    res.status(400);
  } else if (userService.search({phoneNumber: req.body.phoneNumber})) {
    res.err = Error(`User with this phone number already exists`);
    res.status(400);
  }
  next();
};

const updateUserValid = (req, res, next) => {
  const validation = validateUser(req.body)

  if (Object.keys(req.body).length < 1) {
    return Error(`It should be at least one field to update`);
  } else if (validation instanceof Error) {
    res.err = validation;
    res.status(400);
  } else if (!userService.search({id: req.params.id})) {
    res.err = Error(`User does not exist`);
    res.status(400);
  } else if (req.body.email && userService.search({email: req.body.email.toLowerCase()})) {
    res.err = Error(`User with this email already exists. You can not use the same`);
    res.status(400);
  } else if (req.body.phoneNumber && userService.search({phoneNumber: req.body.phoneNumber})) {
    res.err = Error(`User with this phone number already exists. You can not use the same`);
    res.status(400);
  }
  next();
};


export { createUserValid, updateUserValid, validateUser, loginUserValidate };
