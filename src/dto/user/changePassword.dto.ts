import { InferType, object, string } from 'yup'

const ChangePasswordSchema = object({
  password: string().required(),
  changePasswordToken: string().required(),
})

export const changePasswordDto = (data: unknown) => {
  const { password, changePasswordToken } =
    ChangePasswordSchema.camelCase().validateSync(data, { stripUnknown: true })

  return { password, changePasswordToken }
}

export type ChangePasswordDto = InferType<typeof ChangePasswordSchema>;
