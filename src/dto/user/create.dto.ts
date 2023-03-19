import { InferType, object, string } from 'yup'

const createUserSchema = object({
  name: string().required(),
  email: string().lowercase().required(),
  password: string().required(),
})

export const createUserDto = (data: unknown) => {
  const { name, email, password } = createUserSchema
    .camelCase()
    .validateSync(data, { stripUnknown: true })

  return { name, email, password }
}

export type CreateUserDto = InferType<typeof createUserSchema>;
