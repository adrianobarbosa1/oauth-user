import request from "supertest";
import { app } from "../../app";

it("retorna 201 se tiver sucesso no signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(201);
});

it("retorna 400 se for um EMAIL ou USERNAME inválido", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "testetest.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "155455424038",
    })
    .expect(400);
});

it("retorna 400 se for se não tiver um EMAIL, USERNAME, NAME", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      name: "jhon down",
      username: "155455244038",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      name: "jhon down",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      username: "155455244038",
    })
    .expect(400);
});

it("retorna 400 se usuario já for cadastrado com EMAIL", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon maike",
      username: "36302202078",
    })
    .expect(400);
});

it("retorna 400 se usuario já for cadastrado com USERNAME", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "emaildiferente@test.com",
      name: "jhon maike",
      username: "15545544038",
    })
    .expect(400);
});

it("verifica se o COOKIE está setado após sucesso na criação", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "teste@test.com",
      name: "jhon down",
      username: "15545544038",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
