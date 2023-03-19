import Router, { Request } from 'express'
import userControllers from '../controllers/user.controllers'
import {
  CreateUserDto,
  createUserDto,
  RefreshTokenDto,
  refreshTokenDto,
  AuthenticateUserDto,
  authenticateUserDto,
  GenerateChangePasswordTokenDto,
  generateChangePasswordTokenDto,
  ChangePasswordDto,
  changePasswordDto,
} from '../dto'
import { validateRequest } from '../middlewares/validateRequest.middleware'

const routes = Router()

routes.post(
  '/create',
  (req, res, next) =>
    validateRequest<CreateUserDto>(req as Request, res, next, createUserDto),
  async (req, res) => await userControllers.createUserController(req, res)
)

routes.post(
  '/login',
  (req, res, next) =>
    validateRequest<AuthenticateUserDto>(
      req as Request,
      res,
      next,
      authenticateUserDto
    ),
  async (req, res) => await userControllers.authenticateUserController(req, res)
)

routes.post(
  '/refresh',
  (req, res, next) =>
    validateRequest<RefreshTokenDto>(
      req as Request,
      res,
      next,
      refreshTokenDto
    ),
  async (req, res) => await userControllers.refreshTokenController(req, res)
)

routes.post(
  '/generate-change-password-token',
  (req, res, next) =>
    validateRequest<GenerateChangePasswordTokenDto>(
      req as Request,
      res,
      next,
      generateChangePasswordTokenDto
    ),
  async (req, res) =>
    await userControllers.generateChangePasswordTokenController(req, res)
)

routes.post(
  '/change-password',
  (req, res, next) =>
    validateRequest<ChangePasswordDto>(
      req as Request,
      res,
      next,
      changePasswordDto
    ),
  async (req, res) => await userControllers.ChangePasswordController(req, res)
)

export default routes
