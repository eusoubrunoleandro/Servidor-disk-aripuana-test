module.exports = {
    acesso2(req, res, next){
        if(req.sessao_tipo_acesso < 2) return res.status(401).json({ message: 'Você não tem permissão para acessar!' })
        next()
    }
}