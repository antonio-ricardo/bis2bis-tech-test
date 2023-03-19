import { sign } from 'jsonwebtoken'

export const makeTokensWithEmail = async (email: string) => {
  const acessToken = sign(
    {},
    process.env.PRIVATE_KEY || 'private-antonio-key',
    {
      subject: email,
      expiresIn: '1h',
    }
  )

  const refreshToken = sign(
    { provider: 'bis-project' },
    process.env.REFRESH_PRIVATE_KEY || 'refresh-antonio-key',
    {
      subject: email,
      expiresIn: '1d',
    }
  )

  return { acessToken, refreshToken }
}
