import { BadRequestError, validate } from "@dashboard-geral/common";
import { validator } from "cpf-cnpj-validator";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const Joi = require("joi").extend(validator);

const router = express.Router();

//validation
const signupValidation = {
  body: Joi.object().keys({
    username: Joi.document().trim().cpf().required(),
    email: Joi.string().trim().email().required(),
    name: Joi.string().trim().required(),
  }),
};

//registrar
router.post(
  "/api/users/signup",
  validate(signupValidation),
  async (req: Request, res: Response) => {
    const { username, email, name } = req.body;
    const password = username;

    const usernameUser = await User.findOne({ username });
    const emailUser = await User.findOne({ email });

    if (usernameUser) throw new BadRequestError("Usuario já cadastrado");
    if (emailUser) throw new BadRequestError("E-mail já cadastrado");

    const user = User.build({ username, email, name, password });
    await user.save();

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

    res.status(201).send(user);
  }
);

export { router as signupRouter };
