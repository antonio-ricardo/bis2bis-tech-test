export default {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || '123',
  user: process.env.REDIS_USER || 'antonio',
}
