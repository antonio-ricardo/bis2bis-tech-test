import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { UnauthorizedError } from '../common/errors'

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new UnauthorizedError('Token inválido')
    }

    const [prefix, token] = req.headers.authorization.split(' ')

    if (prefix != 'Bearer') {
      throw new UnauthorizedError('Token inválido')
    }

    const verifiedToken = verify(
      token,
      process.env.PRIVATE_KEY || 'private-antonio-key'
    ) as JwtPayload

    res.locals.email = verifiedToken.sub

    next()
  } catch (error) {
    throw new UnauthorizedError('Token inválido')
  }
}
