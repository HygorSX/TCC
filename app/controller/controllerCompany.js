const pool = require("../other/conexao");

class ControllerCompany {
    static Criar(req, res) {
        let { name_company, tel_company, email_company, logradouro, bairro, cidade, password_company, CNPJ } = req.body;
        const sql = "INSERT INTO EMPRESAS (NOME_EMPRESAS, TELEFONE_EMPRESAS, EMAIL_EMPRESAS, LOGRADOURO_EMPRESAS, BAIRRO_EMPRESAS, CIDADE_EMPRESAS, PASSWORD_EMPRESAS, CNPJ_EMPRESAS) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        pool.query(sql, [name_company, tel_company, email_company, logradouro, bairro, cidade, password_company, CNPJ], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error' });
            } else {
                res.status(200).json({ message: "Empresa criada com sucesso", id: results.insertId });
            }
        });
    }
}

module.exports = ControllerCompany;
