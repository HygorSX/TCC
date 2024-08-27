const Product = require('../models/Product');
const pool = require("../other/conexao");
const fs = require('fs');

class ProductController{
    static Criar(req, res) {
        let { id_empresa, name_product, tamanho, marca, valor, descricao, imagem } = req.body;
        const sql = 'INSERT INTO PRODUCTS (ID_EMPRESAS, NOME, TAMANHO, MARCA, VALOR, DESCRICAO, IMAGEM) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const nome_foto = "produto-" + (new Date()).getTime() + ".jpg";
        const caminho_foto = "./app/imagens_produto/" + nome_foto;
        fs.writeFile(caminho_foto, imagem.split(",")[1], {encoding: "base64"}, (err) => {
            if(err){
                res.status(500).json({ error: 'Erro na imagem' });
            }
            else{
                imagem = nome_foto;
                pool.query(sql, [id_empresa, name_product, tamanho, marca, valor, descricao, imagem], (err, results) => {
            
                    if (err) {
                        res.status(500).json({ error: 'Erro no banco de dados.' });
                    }
                    else{
                        res.status(201).json({ message: "Produto criado com sucesso", id: results.insertId });
                    }
                });
            }
        })
    }

    static MostrarTodos(req,  res) {
        const {id} = req.body
        const sql = 'SELECT * FROM PRODUCTS WHERE ID_EMPRESAS = ?';
        pool.query(sql, [id], (err, results) => {
            
            if (err) {
                res.status(500).json({ error: 'Erro no banco de dados.' });
            }
            else{
                res.status(200).json({ message: "Produto buscado com sucesso", produtos : results });
            }
        });
    }

    static Deletar(req, res) {
        const { id } = req.params;
        const sql = 'DELETE FROM PRODUCTS WHERE ID = ?';

        pool.query(sql, [id], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Erro no banco de dados.' });
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({ message: 'Produto não encontrado.' });
                } else {
                    res.status(200).json({ message: 'Produto deletado com sucesso.' });
                }
            }
        });
    }

    static Atualizar(req, res) {
        const { id } = req.params;
        const { name_product, tamanho, marca, valor, descricao, imagem } = req.body;
        const sql = 'UPDATE PRODUCTS SET NOME = ?, TAMANHO = ?, MARCA = ?, VALOR = ?, DESCRICAO = ?, IMAGEM = ? WHERE ID = ?';

        pool.query(sql, [name_product, tamanho, marca, valor, descricao, imagem, id], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Erro no banco de dados.' });
            } else {
                if (results.affectedRows === 0) {
                    res.status(404).json({ message: 'Produto não encontrado.' });
                } else {
                    res.status(200).json({ message: 'Produto atualizado com sucesso.' });
                }
            }
        });
    }
}

module.exports = ProductController;
