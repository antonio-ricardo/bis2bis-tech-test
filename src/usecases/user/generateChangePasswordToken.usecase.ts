import { createTransport } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { GenerateChangePasswordTokenDto } from '../../dto'
import { UserMongoModel } from '../../mongoose/user.model'
import { NotFoundError } from '../../common/errors/notFoundError.error'
import { sign } from 'jsonwebtoken'

export const generateChangePasswordTokenUsecase = async ({
  email,
}: GenerateChangePasswordTokenDto) => {
  const user = await UserMongoModel.findOne({
    email,
  })

  if (!user) {
    throw new NotFoundError(
      'Não foi possível encontrar nenhum usuário com o email enviado'
    )
  }

  const changePasswordToken = sign(
    { provider: 'bis-project' },
    process.env.CHANGE_PASSWORD_KEY || 'bis-change-password-secret',
    {
      subject: email,
      expiresIn: '5m',
    }
  )

  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SECRET_EMAIL || 'bis.teste.tecnico@gmail.com',
      pass: process.env.SECRET_PASSWORD || 'fnbexhappstnrkce',
    },
  })

  const mailOptions: Mail.Options = {
    from: process.env.SECRET_PASSWORD || 'fnbexhappstnrkce',
    to: email,
    subject: 'BIS - troca de senha',
    text: `o seu codigo para mudança de acesso é ${changePasswordToken}`,
  }

  await transporter.sendMail(mailOptions)
}
