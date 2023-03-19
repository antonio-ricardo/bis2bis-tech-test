import { compare } from 'bcrypt'
import { BadRequestError } from '../../common/errors'
import { UserMongoModel } from '../../mongoose/user.model'
import { makeTokensWithEmail } from '../../services/makeTokensWithEmail.service'

interface Input {
  email: string;
  password: string;
}

export const authenticateUserUsecase = async ({ email, password }: Input) => {
  const user = await UserMongoModel.findOne({
    email,
  })

  if (!user) {
    throw new BadRequestError('Senha ou email inválido')
  }

  const passwordIsValid = await compare(password, user.password)

  if (!passwordIsValid) {
    throw new BadRequestError('Senha ou email inválido')
  }

  const { refreshToken, acessToken } = await makeTokensWithEmail(user.email)

  return { refreshToken, acessToken }
}
