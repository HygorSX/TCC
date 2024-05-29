const conn = require("../other/conexao")

class ControllerUsuario{
    static Criar(req, res){
        let {nome, email, password} = req.body

        conn.query('INSERT INTO ')

        
        //console.log(req.body)
        //res.redirect('/')
        res.status(200).json({nome:"joao"})
    }
}
module.exports = ControllerUsuario;