export default () => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
  },

  database: {
    uri: process.env.MONGO_URI,
  },

  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    },

    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    },
  },

  rateLimit: {
    ttl: process.env.RATE_LIMIT_TTL
      ? parseInt(process.env.RATE_LIMIT_TTL, 10)
      : 60000,

    limit: process.env.RATE_LIMIT_LIMIT
      ? parseInt(process.env.RATE_LIMIT_LIMIT, 10)
      : 100,
  },

  authRateLimit: {
    ttl: process.env.AUTH_RATE_LIMIT_TTL
      ? parseInt(process.env.AUTH_RATE_LIMIT_TTL, 10)
      : 60000,

    limit: process.env.AUTH_RATE_LIMIT_LIMIT
      ? parseInt(process.env.AUTH_RATE_LIMIT_LIMIT, 10)
      : 5,
  },
});