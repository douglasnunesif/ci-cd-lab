const request = require("supertest");
const app = require("../app");

describe("API de Usuários", () => {
  test("GET / deve retornar 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(404);
  });

  test("GET /health deve retornar UP", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);

    expect(response.body.status).toBe("UP");
  });

  test("GET /usuarios deve retornar lista", async () => {
    const response = await request(app).get("/usuarios");

    expect(response.statusCode).toBe(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET usuário existente", async () => {
    const response = await request(app).get("/usuarios/1");

    expect(response.statusCode).toBe(200);

    expect(response.body.nome).toBe("Marcelo");
  });

  test("GET usuário inexistente", async () => {
    const response = await request(app).get("/usuarios/999");

    expect(response.statusCode).toBe(404);
  });

  test("POST criar usuário", async () => {
    const response = await request(app).post("/usuarios").send({
      nome: "Maria",
    });

    expect(response.statusCode).toBe(201);

    expect(response.body.nome).toBe("Maria");
  });

  test("POST sem nome deve falhar", async () => {
    const response = await request(app).post("/usuarios").send({});

    expect(response.statusCode).toBe(400);
  });
});
