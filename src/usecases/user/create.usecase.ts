import { CreateUserDto } from '../../dto'
import { hash } from 'bcrypt'
import { makeTokensWithEmail } from '../../services/makeTokensWithEmail.service'
import { ConflictError } from '../../common/errors'
import { UserMongoModel } from '../../mongoose/user.model'

export const createUserUsecase = async ({
  email,
  name,
  password,
}: CreateUserDto) => {
  const userExists = await UserMongoModel.findOne({
    email: email,
  })

  if (userExists) {
    throw new ConflictError('Já existe um usuário com esse email')
  }

  const hashedPassword = await hash(password, 10)

  const { acessToken, refreshToken } = await makeTokensWithEmail(email)

  const createdUser = await UserMongoModel.create({
    email: email,
    name: name,
    password: hashedPassword,
  })

  return { ...createdUser.toJSON(), acessToken, refreshToken }
}
