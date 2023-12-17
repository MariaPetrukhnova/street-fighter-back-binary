const createError = (message) => {
  return {
      error: true,
      message,
  }
}

const responseMiddleware = (req, res, next) => {
  if (res.err) {
    res.status(400).send(createError(res.err.message));
  } else {
      res.status(200).send(res.data);
  }
  next();
}

export { responseMiddleware };
