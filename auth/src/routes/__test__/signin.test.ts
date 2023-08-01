import request from "supertest";
import { app } from "../../app";

it("retorna 200 se conectado com sucesso", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      username: "15545544038",
      password: "15545544038",
    })
    .expect(200);
});

it("verifica se o COOKIE está setado após sucesso no LOGIN", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      username: "15545544038",
      password: "15545544038",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});

it("retorna 400 quando o USERNAME não existe", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      username: "15545544038",
      password: "15545544038",
    })
    .expect(400);
});

it("retorna 400 quando a senha está incorreta", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      username: "15545544038",
      password: "senhaincorreta",
    })
    .expect(400);
});

it("retorna 400 quando a senha está incorreta", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      username: "15545544038",
      password: "senhaincorreta",
    })
    .expect(400);
});
