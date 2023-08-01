import request from "supertest";
import { app } from "../../app";

it("retorna detalhes do usuario atual", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send({})
    .expect(200);

  expect(response.body.currentUser.username).toEqual("15545544038");
});

it("reponse NULL se não estiver autenticado", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
