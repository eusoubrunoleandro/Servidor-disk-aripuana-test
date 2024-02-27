const ModelNegocio = require('../models/ModelNegocio');
const ModelVitrine = require('../models/ModelVitrine')
const connection_pg = require('../database/Connection_pg');
const crypto = require('crypto');

module.exports = {
    async buscaPublica (req, res) {
        try{
            const { search = "", categoria = '', premium = "" } = req.query;
            const bindParams = []
            bindParams[0] = `%${search}%`
            
            if(categoria !== ""){
                bindParams.push(categoria)
            }

            if(premium !== ""){
                bindParams.push(premium === 'true' ? true : false)
            }

            function _modoPremium(premium){
                if(categoria !== ''){
                    return premium !== '' ? " modo_premium=$3 and " : ""   
                }
                
                return premium !== '' ? "modo_premium=$2 and" : ""
            }

            const { rows : content } = await connection_pg.query(
                `SELECT * FROM view_negocio_completo WHERE ${ categoria !== '' ? "id_categoria=$2 and" : ""  } ${ _modoPremium(premium) } (nome_negocio ILIKE $1 OR nome_categoria ILIKE $1 OR descricao_negocio ILIKE $1) AND bloqueado='false' AND conta_verificada='true' ORDER BY modo_premium DESC`,
                bindParams
            )

            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async buscaAdmin (req, res) {
        try{
            const { search = "", mostrarBloqueados = false } = req.query;
            const bindParams = []
            bindParams[0] = `%${search}%`
            bindParams[1] = mostrarBloqueados

            const { rows : content } = await connection_pg.query(
                `SELECT * FROM view_negocio_completo WHERE (nome_negocio ILIKE $1 OR nome_categoria ILIKE $1) AND bloqueado=$2 ORDER BY nome_negocio`,
                bindParams
            )
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async BuscaPerfil (req, res) {
        try{
            const { rows : content } = await connection_pg.query(
                "SELECT * FROM view_negocio_completo WHERE id_negocio=$1",
                [req.params.id_negocio]
            )
            const vitrine = await ModelVitrine.findAll({
                where: {
                    id_negocio: req.params.id_negocio
                }
            })

            const { rows: promocoes } = await connection_pg.query(
                `SELECT * FROM view_promocao where id_negocio=$1 and publicar='true' and bloqueado='false' and conta_verificada='true'`,
                [req.params.id_negocio]
            )

            return res.status(200).json({content, vitrine, promocoes})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async MeuPerfil (req, res) {
        try{
            const { rows : content } = await connection_pg.query(
                "SELECT * FROM view_negocio_perfil WHERE id_negocio=$1",
                [req.sessao_negocio]
            )
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async aberturaDeContaNegocio(req, res, next){
        try{
            const { nome_negocio, email_acesso } = req.body;

            const geradorTokenValidacao = (dado) => {
                return crypto.createHash('sha1').update(dado, "binary").digest('hex')
            }

            const token_acesso = geradorTokenValidacao(nome_negocio)

            const { dataValues } = await ModelNegocio.create({ nome_negocio, email_acesso, token_acesso });
            req.id_negocio_primeiro_cadastro = dataValues.id_negocio;
            req.token_acesso_validacao = token_acesso
            next();
        }
        catch(error){
            return res.status(401).json({ message: error.message, error_completo: error })
        }
    },
    async criarContaAdmin(req, res, next){
        try{
            const { nome_negocio, email_acesso, modo_premium } = req.body;

            const geradorTokenValidacao = (dado) => {
                return crypto.createHash('sha1').update(dado, "binary").digest('hex')
            }

            const token_acesso = geradorTokenValidacao(nome_negocio)

            const { dataValues } = await ModelNegocio.create({ 
                nome_negocio, 
                email_acesso, 
                token_acesso, 
                modo_premium
            });
            req.id_contacriada = dataValues.id_negocio;
            req.token_acesso_validacao = token_acesso
            next();
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async alterar(req, res, next){

        const {
            nome_negocio,
            email_acesso,
            modo_premium
        } = req.body

        const dadosSalvar = {
            nome_negocio,
            email_acesso,
            modo_premium
        }


        try{
            const rest = await ModelNegocio.update( dadosSalvar, {
                where: {
                    id_negocio: req.params.id_negocio
                }
            });

            next();
        }
        catch(error){ return res.status(401).json({ message: error }) }
    },
    async deletar(req, res){
        try{
            await ModelNegocio.destroy({
                where: {
                    id_negocio: req.params.id_negocio
                }
            });
            return res.status(200).json({message:"Registro deletado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async excluirConta(req, res){
        try{
            await ModelNegocio.destroy({
                where: {
                    id_negocio: req.sessao_negocio
                }
            });
            return res.status(200).json({message:"Conta excluída com sucesso!"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}