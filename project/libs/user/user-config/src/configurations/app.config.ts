import { registerAs } from '@nestjs/config';
import Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIROMETS = ['development','stage','production'];

type Enviroment = typeof ENVIROMETS[number];

export interface AppConfig {
  port: number;
  enviroment: Enviroment;
};

const ValidationSchema = Joi.object({
  enviroment: Joi.string().valid(...ENVIROMETS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});


function validateConfig(config: AppConfig) : void {
  const { error } = ValidationSchema.validate(config, {abortEarly: true});

  if (error) {
    throw new Error (`[Application validation configuration error]: ${error.message}`);
  }
}

function getConfig() : AppConfig {
  const con : AppConfig = {
    enviroment: process.env.NODE_ENV as Enviroment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  }

  validateConfig(con);
  return con;
}

export default registerAs('application', getConfig);