const jwt = require("jsonwebtoken");

class Jwt{
    static getKey(){
        return "tcc12345";
    }
    static verificarToken(req, res, next){
        let header_auth_value = req.headers['authorization'];

        if(header_auth_value){
            const token = header_auth_value.split(" ")[1];

            jwt.verify(token, Jwt.getKey(), { algorithms: ["HS512"] }, (err, dadosToken) => {
                if(err){
                    console.log(err)
                    res.status(400).json({message: "Token inválido ou expirado"});
                } else {
                    req.dadosToken = dadosToken;
                    next();
                }
            });
        } else {
            res.status(400).json({message: "Header authorization não foi encontrado"})
        }
    }

    static signToken(dados, opcoes_token, callback){
        opcoes_token.algorithm = "HS512";

        jwt.sign(dados, this.getKey(), opcoes_token, (err, token) => {
            if(err){
                console.log("Erro ao gerar token: " + err);
                callback(("Não foi possível gerar token"), null);
            }
            else{
                callback(null, token);
            }
        })
    }
}

module.exports = Jwt;