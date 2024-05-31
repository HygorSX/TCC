const conn = require("../other/conexao");

class ControllerUsuario {
    static Criar(req, res) {
        let { nome, email, password } = req.body;
        const sql = "INSERT INTO CLIENTES (NOME_CLIENTE, EMAIL_CLIENTE, PASSWORD_CLIENTE) VALUES (?, ?, ?)";

        conn.query(sql, [nome, email, password], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json({ message: "Usuário criado com sucesso", id: results.insertId });
        });
    }
}

module.exports = ControllerUsuario;