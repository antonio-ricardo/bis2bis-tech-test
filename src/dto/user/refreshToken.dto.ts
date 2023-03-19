import { InferType, object, string } from 'yup'

const refreshTokenSchema = object({
  refreshToken: string().required(),
})

export const refreshTokenDto = (data: unknown) => {
  const { refreshToken } = refreshTokenSchema
    .camelCase()
    .validateSync(data, { stripUnknown: true })

  return { refreshToken }
}

export type RefreshTokenDto = InferType<typeof refreshTokenSchema>;
