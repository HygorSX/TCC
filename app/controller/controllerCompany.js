const pool = require("../other/conexao");
const jwt = require("../other/tokenJwt");
const bcrypt = require("bcrypt");

class ControllerCompany {
    static async Criar(req, res) {
        let { name_company, tel_company, email_company, logradouro, bairro, cidade, password_company, CNPJ } = req.body;

        // Validações podem ser feitas aqui, como verificar se os campos estão preenchidos

        try {
            // Criptografa a senha
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password_company, saltRounds);

            const sql = "INSERT INTO EMPRESAS (NOME_EMPRESAS, TELEFONE_EMPRESAS, EMAIL_EMPRESAS, LOGRADOURO_EMPRESAS, BAIRRO_EMPRESAS, CIDADE_EMPRESAS, PASSWORD_EMPRESAS, CNPJ_EMPRESAS) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            pool.query(sql, [name_company, tel_company, email_company, logradouro, bairro, cidade, hashedPassword, CNPJ], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Database error' });
                } else {
                    res.status(200).json({ message: "Empresa criada com sucesso", id: results.insertId });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criptografar a senha.' });
        }
    }

    static async Logar(req, res) {
        const { nome, password } = req.body;
        const sql = 'SELECT * FROM EMPRESAS WHERE NOME_EMPRESAS = ?';

        pool.query(sql, [nome], async (err, results) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Erro do servidor.' });
            } else {
                if (results.length > 0) {
                    const info_empresas = results[0];

                    // Compara a senha fornecida com a senha criptografada
                    const validPassword = await bcrypt.compare(password, info_empresas.PASSWORD_EMPRESAS);

                    if (validPassword) {
                        jwt.signToken({ info_empresas }, {}, (err, token) => {
                            if (err) {
                                res.status(500).json({ success: false, message: 'Erro do servidor ao gerar token.' });
                            }
                            res.status(200).json({ success: true, info_empresas, token });
                        });
                    } else {
                        res.status(401).json({ success: false, message: 'Nome ou senha incorretos.' });
                    }
                } else {
                    res.status(401).json({ success: false, message: 'Nome ou senha incorretos.' });
                }
            }
        });
    }

    static ObterEmpresa(req, res) {
        const { id } = req.params;
        const sql = 'SELECT * FROM EMPRESAS WHERE ID_EMPRESAS = ?';

        pool.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro no servidor ao obter os dados da empresa.' });
            } else if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ error: 'Empresa não encontrada.' });
            }
        });
    }
}

module.exports = ControllerCompany;
