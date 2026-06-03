const express = require("express");

const app = express();

app.use(express.json());

/*
 * Banco de dados em memória
 */
let usuarios = [{ id: 1, nome: "Marcelo" }];

/*
 * Rota principal
 */
app.get("/", (req, res) => {
  res.status(200).send("Laboratório CI/CD com teste quebrado");
});

/*
 * Health Check
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
  });
});

/*
 * Listar usuários
 */
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

/*
 * Buscar usuário por ID
 */
app.get("/usuarios/:id", (req, res) => {
  const usuario = usuarios.find((u) => u.id === parseInt(req.params.id));

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado",
    });
  }

  res.json(usuario);
});

/*
 * Criar usuário
 */
app.post("/usuarios", (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({
      erro: "Nome é obrigatório",
    });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
  };

  usuarios.push(novoUsuario);

  res.status(201).json(novoUsuario);
});

/*
 * Executa somente em produção
 */

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
}

/*
 * Exporta para testes
 */
module.exports = app;
