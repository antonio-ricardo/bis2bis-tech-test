import { BaseRequest } from './../common/baseRequest'
import { SuccessResponse } from './../common/successResponse'
import { Response } from 'express'
import {
  createUserUsecase,
  authenticateUserUsecase,
  refreshUserTokenUsecase,
  generateChangePasswordTokenUsecase,
} from '../usecases'
import {
  CreateUserDto,
  AuthenticateUserDto,
  RefreshTokenDto,
  GenerateChangePasswordTokenDto,
  ChangePasswordDto,
} from '../dto'
import { SuccessNoContentResponse } from '../common/sucessNoContentResponse'
import { changePasswordUsecase } from '../usecases/user/changePassword.usecase'

export default {
  async createUserController(req: BaseRequest<CreateUserDto>, res: Response) {
    const createdUser = await createUserUsecase(req.body)

    const { body, status } = SuccessResponse.create(createdUser)

    return res.status(status).json(body)
  },

  async authenticateUserController(
    req: BaseRequest<AuthenticateUserDto>,
    res: Response
  ) {
    const { acessToken, refreshToken } = await authenticateUserUsecase(
      req.body
    )

    const { body, status } = SuccessResponse.create({
      acessToken,
      refreshToken,
    })

    return res.status(status).json(body)
  },

  async refreshTokenController(
    req: BaseRequest<RefreshTokenDto>,
    res: Response
  ) {
    const { acessToken, refreshToken } = await refreshUserTokenUsecase(
      req.body
    )

    const { body, status } = SuccessResponse.create({
      acessToken,
      refreshToken,
    })

    return res.status(status).json(body)
  },

  async generateChangePasswordTokenController(
    req: BaseRequest<GenerateChangePasswordTokenDto>,
    res: Response
  ) {
    await generateChangePasswordTokenUsecase(req.body)

    const { body, status } = SuccessNoContentResponse.create()

    return res.status(status).json(body)
  },

  async ChangePasswordController(
    req: BaseRequest<ChangePasswordDto>,
    res: Response
  ) {
    const tokens = await changePasswordUsecase(req.body)

    const { body, status } = SuccessResponse.create(tokens)

    return res.status(status).json(body)
  },
}
