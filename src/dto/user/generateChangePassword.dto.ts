import { InferType, object, string } from 'yup'

const generateChangePasswordTokenSchema = object({
  email: string().required(),
})

export const generateChangePasswordTokenDto = (data: unknown) => {
  const { email } = generateChangePasswordTokenSchema
    .camelCase()
    .validateSync(data, { stripUnknown: true })

  return { email }
}

export type GenerateChangePasswordTokenDto = InferType<
  typeof generateChangePasswordTokenSchema
>;
