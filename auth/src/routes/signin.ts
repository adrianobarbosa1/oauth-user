import { BadRequestError, validate } from "@dashboard-geral/common";
import { validator } from "cpf-cnpj-validator";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { Password } from "../service/password";

const Joi = require("joi").extend(validator);

const router = express.Router();

//validation
const signinValidation = {
  body: Joi.object().keys({
    username: Joi.document().trim().cpf().required(),
    password: Joi.string().trim().required(),
  }),
};

//entrar
router.post(
  "/api/users/signin",
  validate(signinValidation),
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) throw new BadRequestError("Credenciais inválidas");

    const passwordsMatch = await Password.compare(user.password, password);
    if (!passwordsMatch) throw new BadRequestError("Credenciais inválidas");

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
      },
      process.env.JWT_KEY! // !serve para dizer ao type que temos 100% de certeza que passamos a key
    );

    // add jwt in cookie
    req.session = { jwt: userJwt };

    res.status(200).send(user);
  }
);

export { router as signinRouter };
