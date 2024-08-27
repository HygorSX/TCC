const express = require("express");
const api = express();
const app = express();
const port = 80;
const portApi = 3000;
const cors = require("cors");
const pool = require('./app/other/conexao');
const path = require("path")
/*var session = require("express-session");*/

// Configurando cors para evitar erros
api.use(cors());
api.use(express.json({ limit: "5mb" }));

app.use(express.static("app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

/*app.use(
  session({
    secret: "HELLonODE",
    resave: false,
    saveUninitialized: false,
  }));*/

var rotas = require("./app/routes/router");
app.use("/", rotas);

var rotasApi = require("./app/routes/routerApi");
api.use("/", rotasApi);
api.use("/imagens_produto", express.static(path.join(__dirname, "app","imagens_produto")))

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});

api.listen(portApi, () => {
  console.log(`Api ouvindo na porta ${portApi}\nhttp://localhost:${portApi}`);
});

pool.query("SELECT 1", (err, results) => {
  if (err) throw err;
  console.log("Banco conectado");
});