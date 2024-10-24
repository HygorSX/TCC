const Product = require('../models/Product');
const pool = require("../other/conexao");
const fs = require('fs');

class ProductController {
    static Criar(req, res) {
        let { id_empresa, name_product, tamanho, marca, valor, descricao, imagem, url_produto, categoria } = req.body;
        const sql = 'INSERT INTO PRODUCTS (ID_EMPRESAS, NOME, TAMANHO, MARCA, VALOR, DESCRICAO, IMAGEM, URL_PRODUTO, CATEGORIA) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const nome_foto = "produto-" + (new Date()).getTime() + ".jpg";
        const caminho_foto = "./app/public/imagens_produto/" + nome_foto;

        fs.writeFile(caminho_foto, imagem.split(",")[1], { encoding: "base64" }, (err) => {
            if (err) {
                res.status(500).json({ error: 'Erro na imagem' });
            } else {
                imagem = nome_foto;
                pool.query(sql, [id_empresa, name_product, tamanho, marca, valor, descricao, imagem, url_produto, categoria], (err, results) => {
                    if (err) {
                        res.status(500).json({ error: 'Erro no banco de dados.' });
                    } else {
                        res.status(201).json({ message: "Produto criado com sucesso", id: results.insertId });
                    }
                });
            }
        });
    }

    static MostrarTodos(req, res) {
        const { id } = req.body;
        const sql = 'SELECT * FROM PRODUCTS WHERE ID_EMPRESAS = ?';
        pool.query(sql, [id], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Erro no banco de dados.' });
            } else {
                res.status(200).json({ message: "Produtos buscados com sucesso", produtos: results });
            }
        });
    }

    static MostrarTodosHome(req, res) {
        const sql = 'SELECT * FROM PRODUCTS';
        pool.query(sql, (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Erro no banco de dados.' });
            } else {
                res.status(200).json({ message: "Produtos buscados com sucesso", produtos: results });
            }
        });
    }

    static MostrarProdutosRelacionados(req, res) {
        const { nome_produto } = req.query;
        const sql = 'SELECT * FROM PRODUCTS WHERE NOME != ?';
    
        pool.query(sql, [nome_produto], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Erro no banco de dados.' });
            } else {
                res.status(200).json({ message: "Produtos relacionados buscados com sucesso", produtos: results });
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
        let { name_product, tamanho, marca, valor, descricao, imagem, url_produto, categoria } = req.body;
        const sql = 'UPDATE PRODUCTS SET NOME = ?, TAMANHO = ?, MARCA = ?, VALOR = ?, DESCRICAO = ?, IMAGEM = ?, URL_PRODUTO = ?, CATEGORIA = ? WHERE ID = ?';

        if (imagem) {
            const nome_foto = "produto-" + (new Date()).getTime() + ".jpg";
            const caminho_foto = "./app/public/imagens_produto/" + nome_foto;

            fs.writeFile(caminho_foto, imagem.split(",")[1], { encoding: "base64" }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao salvar a imagem.' });
                } else {
                    imagem = nome_foto;
                    pool.query(sql, [name_product, tamanho, marca, valor, descricao, imagem, url_produto, categoria, id], (err, results) => {
                        if (err) {
                            return res.status(500).json({ error: 'Erro no banco de dados.' });
                        } else {
                            if (results.affectedRows === 0) {
                                return res.status(404).json({ message: 'Produto não encontrado.' });
                            } else {
                                return res.status(200).json({ message: 'Produto atualizado com sucesso.' });
                            }
                        }
                    });
                }
            });
        } else {
            pool.query(sql, [name_product, tamanho, marca, valor, descricao, imagem, url_produto, categoria, id], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro no banco de dados.' });
                } else {
                    if (results.affectedRows === 0) {
                        return res.status(404).json({ message: 'Produto não encontrado.' });
                    } else {
                        return res.status(200).json({ message: 'Produto atualizado com sucesso.' });
                    }
                }
            });
        }
    }

    static BuscarProdutos(req, res) {
        const query = req.query.query;

        if (!query) {
            return res.status(400).json({ error: 'Termo de pesquisa não fornecido.' });
        }

        const sql = 'SELECT * FROM PRODUCTS WHERE NOME LIKE ?';
        const searchQuery = `%${query}%`;

        pool.query(sql, [searchQuery], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no banco de dados.' });
            }

            return res.status(200).json({ produtos: results });
        });
    }

    static MostrarPorCategoria(req, res) {
        const { categoria } = req.params; // Obtém a categoria a partir dos parâmetros da URL
        const sql = 'SELECT * FROM PRODUCTS WHERE CATEGORIA = ?';
    
        pool.query(sql, [categoria], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Erro no banco de dados.' });
            } else {
                res.status(200).json({ message: "Produtos da categoria buscados com sucesso", produtos: results });
            }
        });
    }
    
}

module.exports = ProductController;
