import { JwtPayload, verify } from 'jsonwebtoken'
import { UnauthorizedError } from '../../common/errors/unauthorized.error'
import { RefreshTokenDto } from '../../dto'
import { UserMongoModel } from '../../mongoose/user.model'
import { makeTokensWithEmail } from '../../services/makeTokensWithEmail.service'

export const refreshUserTokenUsecase = async (input: RefreshTokenDto) => {
  try {
    const verifiedToken = verify(
      input.refreshToken,
      process.env.REFRESH_PRIVATE_KEY || 'refresh-antonio-key'
    ) as JwtPayload

    if (!verifiedToken.provider || verifiedToken.provider !== 'bis-project') {
      throw new UnauthorizedError('Token inválido')
    }

    const user = await UserMongoModel.findOne({ email: verifiedToken.sub })

    if (!user) {
      throw new UnauthorizedError('Token inválido')
    }

    const { refreshToken, acessToken } = await makeTokensWithEmail(user.email)

    return { acessToken, refreshToken }
  } catch (err) {
    throw new UnauthorizedError('Token inválido')
  }
}
