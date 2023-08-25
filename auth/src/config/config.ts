import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    JWT_KEY: Joi.string().required().description("JWT secret key"),
    MONGODB_URL: Joi.string().required().description("Mongodb_URL"),
    PORT: Joi.number().default(3000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  JWT_KEY: process.env.JWT_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
};
