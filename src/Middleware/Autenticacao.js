const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const tokenRecebido = req.headers.auth

    if(tokenRecebido === undefined || tokenRecebido === '')
    return res.status(401).json({
        message: "redirect"
    })

    if(process.env.CHAVE_JWT === undefined || process.env.CHAVE_JWT === '')
    return res.status(404).json({
        message: "redirect"
    })

    jwt.verify(tokenRecebido, process.env.CHAVE_JWT, (erro, decoded) => {
        if(erro)
        return res.status(401).json({
            message: "redirect",
        });

        const { neg, tip, blo } = decoded;
        if(blo) return res.status(401).json({ message: "redirect" })

        if(neg === undefined || neg === undefined) return res.status(401).json({
            message: "redirect"
        });
        
        req.sessao_negocio = neg;
        req.sessao_tipo_acesso = tip;
        req.sessao_bloqueado = blo;

        next()
    })
}