const express = require("express");
const api = express();
const app = express();
const port = 80;
const portApi = 3000;
const cors = require("cors");
const conn = require('./app/other/conexao');

// Configurando cors para evitar erros
api.use(cors());
api.use(express.json({ limit: "5mb" }));

app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

var rotas = require("./app/routes/router");
app.use("/", rotas);

var rotasApi = require("./app/routes/routerApi");
api.use("/", rotasApi);

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});

api.listen(portApi, () => {
  console.log(`Api ouvindo na porta ${portApi}\nhttp://localhost:${portApi}`);
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Banco conectado");
});

conn.connect(function (err) {
  if (err) throw err;
  console.log('Banco conectado');
});

// Rota de login
api.post('/login', (req, res) => {
  const { nome, password } = req.body;
  const sql = 'SELECT * FROM CLIENTES WHERE NOME_CLIENTE = ? AND PASSWORD_CLIENTE = ?';

  conn.query(sql, [nome, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }

    if (results.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Nome ou senha incorretos' });
    }
  });
});