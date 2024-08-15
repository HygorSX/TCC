const pool = require("../other/conexao");
const jwt = require("../other/tokenJwt");

class ControllerUsuario {
    static Criar(req, res) {
        let { nome, email, password, confirmPassword } = req.body;

        // Validação básica para checar se os campos não estão vazios
        if (!nome || !email || !password || !confirmPassword) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            return
        }

        // Verifica se as senhas coincidem
        if (password !== confirmPassword) {
            res.status(400).json({ error: 'As senhas não coincidem.' });
            return
        }

        // Verifica se o email está em um formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Email inválido.' });
            return
        }

        const sql = "INSERT INTO CLIENTES (NOME_CLIENTE, EMAIL_CLIENTE, PASSWORD_CLIENTE) VALUES (?, ?, ?)";
        pool.query(sql, [nome, email, password], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(409).json({ error: 'O email já está em uso.' });
                }
                else{
                    res.status(500).json({ error: 'Erro no banco de dados.' });
                }
            }
            else{
                res.status(201).json({ message: "Usuário criado com sucesso", id: results.insertId });
            }
        });
    }

    static Logar(req, res) {
        const { nome, password } = req.body;
        const sql = 'SELECT * FROM CLIENTES WHERE NOME_CLIENTE = ? AND PASSWORD_CLIENTE = ?';

        pool.query(sql, [nome, password], (err, results) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Erro do servidor.' });
            }
            else{
                if (results.length > 0) {
                    const info_usuario = results[0];
                    jwt.signToken({ info_usuario }, {}, (err, token) => {
                        if (err) {
                            res.status(500).json({ success: false, message: 'Erro do servidor ao gerar token.' });
                        }
                        res.status(200).json({ success: true, info_usuario, token });
                    });
                } else {
                    res.status(401).json({ success: false, message: 'Nome ou senha incorretos.' });
                }
            }
        });
    }
}

module.exports = ControllerUsuario;
