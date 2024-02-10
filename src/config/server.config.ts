export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT) || 3000,
  jwtKey: process.env.JWT_KEY,
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
});
