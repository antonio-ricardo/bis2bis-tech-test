import { InferType, object, string } from 'yup'

const changePasswordSchema = object({
  password: string().required(),
  changePasswordToken: string().required(),
})

export const changePasswordDto = (data: unknown) => {
  const { password, changePasswordToken } = changePasswordSchema
    .camelCase()
    .validateSync(data, { stripUnknown: true })

  return { password, changePasswordToken }
}

export type ChangePasswordDto = InferType<typeof changePasswordSchema>;
