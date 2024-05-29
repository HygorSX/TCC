const express = require("express");
const api = express();
const app = express();
const port = 80;
const portApi = 3000;
const cors = require("cors");

const conn = require('./app/other/conexao')

//Configurando cors para evitar erros
api.get("*", cors());
api.post("*", cors());
api.put("*", cors());
api.patch("*", cors());  
api.delete("*", cors());
api.head("*", cors());

api.options('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

api.options('*', cors());

api.use(express.json({ limit: "5mb"}));

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

conn.connect(function(err){
  if(err) throw err;
  console.log("banco conectado")

conn.end(function(err){
  console.log("conexao encerrada")
})
  
});
