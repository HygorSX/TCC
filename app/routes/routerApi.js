var express = require("express");
var router = express.Router();
const controllerUsuario = require("../controller/controllerUsuario");
const controllerCompany = require("../controller/controllerCompany");

router.post("/criar_usuario", function (req, res) {
    controllerUsuario.Criar(req, res);
});

router.post("/criar_empresa", function (req, res) {
  controllerCompany.Criar(req, res);
});

router.post('/login', (req, res) => {
  controllerUsuario.Logar(req, res);
});

module.exports = router;