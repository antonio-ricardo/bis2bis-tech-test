import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import { logger } from '../helpers/logger.helper'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next()
  }

  if (process.env.ENVIRONMENT === 'production') {
    logger.info(err)
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message })
  }

  const { status, message } = getErrorResponse(err)

  return res.status(status).json({ message })
}

const getErrorResponse = (err: Error) => {
  switch (err.name) {
    case 'BadRequestError':
      return { message: err.message, status: 400 }
    case 'UnauthorizedError':
      return { message: err.message, status: 401 }
    case 'NotFoundError':
      return { message: err.message, status: 404 }
    case 'ConflictError':
      return { message: err.message, status: 409 }
    default:
      return { message: err.message, status: 500 }
  }
}
