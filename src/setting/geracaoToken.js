const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto')

const CriadordeToken = ({ id_negocio, tipo_acesso, bloqueado }) => {

    return jsonwebtoken.sign({
        neg: id_negocio,
        tip: tipo_acesso,
        blo: bloqueado
    }, process.env.CHAVE_JWT,{
        expiresIn: ((60 * 60) * 24) * 5,
    })
}

module.exports = CriadordeToken;