import { ErrorRequestHandler, RequestHandler } from 'express';

export const unknownEndpoint: RequestHandler = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint.' });
};
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof Error) {
    res.status(400).send({ error: err.message });
  }
  next(err);
};

export default { unknownEndpoint, errorHandler };
