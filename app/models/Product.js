const pool = require("../other/conexao");

const Product = {
    getAll: (callback) => {
        const sql = 'SELECT * FROM PRODUCTS';
        pool.query(sql, callback);
    },

    getById: (id, callback) => {
        const sql = 'SELECT * FROM PRODUCTS WHERE ID = ?';
        pool.query(sql, [id], callback);
    },

    create: (product, callback) => {
        const { nome, tamanho, marca, valor, descricao, imagem } = product;
        const sql = 'INSERT INTO PRODUCTS (NOME, TAMANHO, MARCA, VALOR, DESCRICAO, IMAGEM) VALUES (?, ?, ?, ?, ?, ?)';
        pool.query(sql, [nome, tamanho, marca, valor, descricao, imagem], callback);
    },

    update: (id, product, callback) => {
        const { nome, tamanho, marca, valor, descricao, imagem } = product;
        const sql = 'UPDATE PRODUCTS SET NOME = ?, TAMANHO = ?, MARCA = ?, VALOR = ?, DESCRICAO = ?, IMAGEM = ? WHERE ID = ?';
        pool.query(sql, [nome, tamanho, marca, valor, descricao, imagem, id], callback);
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM PRODUCTS WHERE ID = ?';
        pool.query(sql, [id], callback);
    }
};

module.exports = Product;
