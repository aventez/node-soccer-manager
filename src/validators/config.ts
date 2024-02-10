import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
  PORT: Joi.number().default(3000),
  JWT_KEY: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().required(),
});
