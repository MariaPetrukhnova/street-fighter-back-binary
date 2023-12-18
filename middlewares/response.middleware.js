const createError = (message) => {
  return {
      error: true,
      message,
  }
}

const responseMiddleware = (req, res, next) => {
  if (!res.err) {
    res.status(200).send(res.data);
  } else if (res.err && res.err.message.includes("not found")) {
    res.status(404).send(createError(res.err.message))
  } else {
    res.status(400).send(createError(res.err.message));
  }

  next();
}

export { responseMiddleware };
