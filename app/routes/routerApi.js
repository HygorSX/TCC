var express = require("express");
var router = express.Router();
const controllerUsuario = require("../controller/controllerUsuario");

router.post("/criar_usuario", function (req, res) {
    controllerUsuario.Criar(req, res);
});

module.exports = router;