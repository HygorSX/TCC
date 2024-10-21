const Product = require('../models/Product');
const pool = require("../other/conexao");
const fs = require('fs');

class ProductController{
    static Criar(req, res) {
        let { id_empresa, name_product, tamanho, marca, valor, descricao, imagem, url_produto } = req.body;
        const sql = 'INSERT INTO PRODUCTS (ID_EMPRESAS, NOME, TAMANHO, MARCA, VALOR, DESCRICAO, IMAGEM, URL_PRODUTO) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const nome_foto = "produto-" + (new Date()).getTime() + ".jpg";
        const caminho_foto = "./app/public/imagens_produto/" + nome_foto;
        fs.writeFile(caminho_foto, imagem.split(",")[1], {encoding: "base64"}, (err) => {
            if(err){
                res.status(500).json({ error: 'Erro na imagem' });
            }
            else{
                imagem = nome_foto;
                pool.query(sql, [id_empresa, name_product, tamanho, marca, valor, descricao, imagem, url_produto], (err, results) => {
            
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
        const { nome_produto } = req.query; // Recebe o nome do produto em destaque como parâmetro
        const sql = 'SELECT * FROM PRODUCTS WHERE NOME != ?'; // Exclui o produto em destaque
    
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
        const { id } = req.params;  // Pega o ID do produto a ser atualizado
        let { name_product, tamanho, marca, valor, descricao, imagem, url_produto } = req.body;
        console.log(req.body);
        
        const sql = 'UPDATE PRODUCTS SET NOME = ?, TAMANHO = ?, MARCA = ?, VALOR = ?, DESCRICAO = ?, IMAGEM = ?, URL_PRODUTO = ? WHERE ID = ?';
        
        // Se houver uma nova imagem, trata a imagem e salva no servidor
        if (imagem) {
            const nome_foto = "produto-" + (new Date()).getTime() + ".jpg";  // Cria um nome único para a imagem
            const caminho_foto = "./app/public/imagens_produto/" + nome_foto;
    
            fs.writeFile(caminho_foto, imagem.split(",")[1], { encoding: "base64" }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao salvar a imagem.' });
                } else {
                    imagem = nome_foto;  // Atualiza o campo imagem com o nome da foto salva
                    // Atualiza o produto no banco de dados
                    pool.query(sql, [name_product, tamanho, marca, valor, descricao, imagem, url_produto, id], (err, results) => {
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
            // Se não houver uma nova imagem, mantém a existente e apenas atualiza os outros campos
            pool.query(sql, [name_product, tamanho, marca, valor, descricao, imagem, url_produto, id], (err, results) => {
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
        const query = req.query.query; // Obtém o parâmetro 'query' da URL
    
        if (!query) {
            return res.status(400).json({ error: 'Termo de pesquisa não fornecido.' });
        }
    
        const sql = 'SELECT * FROM PRODUCTS WHERE NOME LIKE ?';
        const searchQuery = `%${query}%`; // Usa LIKE para buscar produtos que contenham o termo
    
        pool.query(sql, [searchQuery], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro no banco de dados.' });
            }
    
            return res.status(200).json({ produtos: results }); // Retorna os produtos encontrados
        });
    }
}

module.exports = ProductController;
