import { InferType, object, string } from 'yup'

const authenticateUserSchema = object({
  email: string().required(),
  password: string().required(),
})

export const authenticateUserDto = (data: unknown) => {
  const { email, password } = authenticateUserSchema
    .camelCase()
    .validateSync(data, { stripUnknown: true })

  return { email, password }
}

export type AuthenticateUserDto = InferType<typeof authenticateUserSchema>;
