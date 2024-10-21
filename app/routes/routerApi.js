var express = require("express");
const path = require('path');
const app = express();
var router = express.Router();
const controllerUsuario = require("../controller/controllerUsuario");
const controllerCompany = require("../controller/controllerCompany");
const ProductController = require('../controller/ProductController');
app.use('/imagens_produto', express.static(path.join(__dirname, 'app/imagens_produto')));

router.post("/criar_usuario", function (req, res) {
    controllerUsuario.Criar(req, res);
});

router.post("/criar_empresa", function (req, res) {
  controllerCompany.Criar(req, res);
});

router.post('/login', (req, res) => {
  controllerUsuario.Logar(req, res);
});

router.post('/login_empresa', (req, res) => {
  controllerCompany.Logar(req, res);
});

router.get('/empresa/:id', (req, res) => {
  controllerCompany.ObterEmpresa(req, res);
});

router.post('/products_usuario', ProductController.MostrarTodos);
router.get('/products', ProductController.MostrarTodosHome);
router.get('/products/search', ProductController.BuscarProdutos); // Mantenha esta linha
router.get('/produtos-relacionados', ProductController.MostrarProdutosRelacionados);
router.post('/products', ProductController.Criar);
router.put('/products/:id', ProductController.Atualizar);
router.delete('/products/:id', ProductController.Deletar);

module.exports = router;
