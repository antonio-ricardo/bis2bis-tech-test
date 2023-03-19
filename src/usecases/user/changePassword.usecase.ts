import { hash } from 'bcrypt'
import { verify } from 'jsonwebtoken'
import { UnauthorizedError } from '../../common/errors'
import { ChangePasswordDto } from '../../dto'
import { UserMongoModel } from '../../mongoose/user.model'
import { makeTokensWithEmail } from '../../services/makeTokensWithEmail.service'

export const changePasswordUsecase = async ({
  changePasswordToken,
  password,
}: ChangePasswordDto) => {
  try {
    const verifiedToken = verify(
      changePasswordToken,
      process.env.CHANGE_PASSWORD_KEY || 'bis-change-password-secret'
    )

    const email = verifiedToken.sub as string | undefined

    if (!email) {
      throw new UnauthorizedError('Token inválido ou expirado')
    }

    const hashedPassword = await hash(password, 10)

    await UserMongoModel.updateOne(
      {
        email,
      },
      {
        password: hashedPassword,
      }
    )

    return await makeTokensWithEmail(email)
  } catch (error) {
    throw new UnauthorizedError('Token inválido ou expirado')
  }
}
