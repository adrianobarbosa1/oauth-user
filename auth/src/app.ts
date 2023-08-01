import express from "express";
import "express-async-errors";

import { NotFoundError, errorHandler } from "@dashboard-geral/common";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { nameApiRouter } from "./routes/name-api";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.set("trust proxy", true); //express confiar no proxy ingress nginx

// parse json request body
app.use(express.json({ limit: "50mb" }));
app.use(
  cookieSession({
    signed: false, // false para não encriptografar o cookie
    //secure true para usar apenas https,
    //verifica se está em ambiente de teste se estiver é setado para false
    secure: process.env.NODE_ENV !== "test",
  })
);

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(currentUserRouter);
app.use(nameApiRouter);
app.use(signinRouter); //login
app.use(signoutRouter); //sair
app.use(signupRouter); //register

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
