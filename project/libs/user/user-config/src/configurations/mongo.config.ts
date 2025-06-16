import { registerAs } from '@nestjs/config';
import Joi from 'joi';

//interface mongoconfiga
export interface MongoConfig {
  db_name: string;
  host: string;
  port: number;
  user: string;
  pass: string;
  auth_base: string;
}

const DEFAULT_DB_PORT = 27027;

const mongoValidationSchema = Joi.object(
  {
    host: Joi.string().hostname().required(),
    port: Joi.number().port().default(DEFAULT_DB_PORT),
    auth_base: Joi.string().required(),
    db_name: Joi.string().required(),
    pass: Joi.string().required(),
    user: Joi.string().required(),
  }
);

function validateDBConfig(conf: MongoConfig) : void {
  const { error } = mongoValidationSchema.validate(conf);

  if (error) {
    throw new Error (`[MongoDB validation configuration error]: ${error.message}`);
  }
}

function getMongoDBConfig() : MongoConfig {
  const dbConf : MongoConfig = {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    auth_base : process.env.MONGO_AUTH_BASE,
    db_name: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
  };

  validateDBConfig(dbConf);
  return dbConf;
}

export default registerAs('db', getMongoDBConfig);
