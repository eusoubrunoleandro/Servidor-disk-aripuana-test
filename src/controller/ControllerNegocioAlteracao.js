const ModelNegocio = require('../models/ModelNegocio');
const ModelNegocioDados = require('../models/ModelNegocioDados')
const connection_pg = require('../database/Connection_pg');

module.exports = {
    async dadosBasicos(req, res, next){
        try{
            const { nome_negocio, email_acesso } = req.body;
            
            await ModelNegocio.update({ nome_negocio, email_acesso },{ where: { id_negocio: req.sessao_negocio } });
            
            next()
        }
        catch(error){ return res.status(401).json({ message: error }) }
    },
    async dadosLinks(req, res){
        try{
            const { link_instagram, link_facebook, link_site, email_comercial } = req.body;
            const dados = {
                link_facebook, 
                link_instagram, 
                link_site, 
                email_comercial 
            }
            
            await ModelNegocioDados.update( dados ,{ where: { id_negocio: req.sessao_negocio } });
            
            return res.status(200).json({ message: "Links atualizados!" })
        }
        catch(error){ return res.status(401).json({ message: error }) }
    },
    async dadosTelefones(req, res){
        try{
            const { telefone_1, telefone_2, telefone_3, telefone_4 } = req.body;

            await ModelNegocioDados.update( { telefone_1, telefone_2, telefone_3, telefone_4 } ,{ where: { id_negocio: req.sessao_negocio } });
            return res.status(200).json({ message: "Telefones atualizados!" })
        }
        catch(error){ return res.status(401).json({ message: error }) }
    },
    async dadosEndereco(req, res){
        try{
            const { cep, endereco, cidade, uf, pais } = req.body;

            await ModelNegocioDados.update( { cep, endereco, cidade, uf, pais } ,{ where: { id_negocio: req.sessao_negocio } });
            return res.status(200).json({ message: "Informações de endereço atualizadas!" })
        }
        catch(error){ return res.status(401).json({ message: error }) }
    },
    async dadosSobre(req, res){
        try{
            const { descricao_negocio } = req.body;
            console.log(descricao_negocio)

            await ModelNegocioDados.update( { descricao_negocio } ,{ where: { id_negocio: req.sessao_negocio } });
            return res.status(200).json({ message: "Descrição da conta atualizada!" })
        }
        catch(error){ return res.status(401).json({ message: error }) }
    },
}