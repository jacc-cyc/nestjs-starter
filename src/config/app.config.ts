export default () => ({
  app: {
    pathPrefix: 'nbi-service',
    port: process.env.PORT,
    swaggerPath: process.env.SWAGGER_PATH,
    env: process.env.ENV,
  },
  API_KEY: process.env.API_KEY,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  services: {
    database: {
      uri: process.env.DB_URI,
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PW,
    },
  },
  static: {
    paginateLimit: 20,
  },
});
