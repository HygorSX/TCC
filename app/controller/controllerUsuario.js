const pool = require("../other/conexao");
const jwt = require("../other/tokenJwt")

class ControllerUsuario {
    static Criar(req, res) {
      
            let { nome, email, password } = req.body;
            const sql = "INSERT INTO CLIENTES (NOME_CLIENTE, EMAIL_CLIENTE, PASSWORD_CLIENTE) VALUES (?, ?, ?)";
    
            pool.query(sql, [nome, email, password], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Database error' });
                }
                res.status(200).json({ message: "Usuário criado com sucesso", id: results.insertId });
            });

    }
    static Logar(req, res){

            const { nome, password } = req.body;
            const sql = 'SELECT * FROM CLIENTES WHERE NOME_CLIENTE = ? AND PASSWORD_CLIENTE = ?';

            pool.query(sql, [nome, password], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false, message: 'Erro do servidor' });
                }

                if (results.length > 0) {
                    const info_usuario = results[0]
                    jwt.signToken({ info_usuario }, {}, (err, token) => {
                        if(err){
                            console.error(err)
                            res.status(500).json({success: false, message: 'Erro do servidor ao gerar token'})
                        }else{
                            res.status(200).json({ success: true, info_usuario, token });
                        }
                    });
                } else {
                    res.status(401).json({ success: false, message: 'Nome ou senha incorretos' });
                }
            });

       
    }
}

module.exports = ControllerUsuario;