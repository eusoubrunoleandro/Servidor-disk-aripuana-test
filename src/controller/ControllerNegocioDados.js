const ModelNegocioDados = require('../models/ModelNegocioDados');
const ModelNegocio = require('../models/ModelNegocio')

module.exports = {
    async busca (req, res) {
        try{
            const content = await ModelNegocioDados.findAll();
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async inserir(req, res, next){
        try{
            const {
                nome_negocio,
                email_acesso,
            } = req.body;

            if(nome_negocio === "" || nome_negocio === undefined){ return res.status(401).json({ message: "Nome do negócio não pode ser vazio!" }) }
            if(email_acesso === "" || email_acesso === undefined){ return res.status(401).json({ message: "E-mail de acesso não pode ser vazio!" }) }

            const join_data = Object.assign({ nome_negocio, email_acesso }, {
                id_negocio_registro: req.sessao_negocio
            })

            const { dataValues: content } = await ModelNegocioDados.create(join_data);
            
            next()
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async aberturaDeContaNegocioDados(req, res, next){
        const { telefone, cidade, cep, pais, uf } = req.body
        try{
            const join_data = {
                id_negocio: req.id_negocio_primeiro_cadastro,
                cep,
                cidade,
                uf,
                pais,
                telefone_1: [telefone, 'n'],
                id_negocio_registro: req.id_negocio_primeiro_cadastro
            }
            await ModelNegocioDados.create(join_data);
            next()
        }
        catch(error){
            await ModelNegocio.destroy({
                where: {
                    id_negocio: req.id_negocio_primeiro_cadastro
                }
            })

            return res.status(401).json({ message: error.message, error_completo: error })
        }
    },

    async aberturaDeContaNegocioDadosAdmin(req, res, next){
        const { 
            telefone_1,
            telefone_2,
            telefone_3,
            telefone_4,
            link_instagram = null,
            link_facebook = null,
            link_site = null,
            email_comercial,
            endereco = null,
            cep,
            cidade,
            uf,
            pais,
            descricao_negocio = null
        } = req.body
        try{
            const join_data = {
                id_negocio: req.id_contacriada,
                cep,
                cidade,
                uf,
                pais,
                link_instagram,
                link_facebook,
                link_site,
                email_comercial: email_comercial || req.body.email_acesso,
                endereco,
                telefone_1,
                telefone_2: telefone_2 === "" ? null : telefone_2,
                telefone_3: telefone_3 === "" ? null : telefone_3,
                telefone_4: telefone_4 === "" ? null : telefone_4,
                descricao_negocio,
                id_negocio_registro: req.sessao_negocio
            }

            await ModelNegocioDados.create(join_data);
            next();
        }
        catch(error){
            await ModelNegocio.destroy({
                where: {
                    id_negocio: req.id_contacriada
                }
            })

            return res.status(401).json({ message: error })
        }
    },

    async alterar(req, res, next){

        const {
            telefone_1,
            telefone_2,
            telefone_3,
            telefone_4,
            link_instagram,
            link_facebook,
            link_site,
            email_comercial,
            endereco,
            descricao_negocio,
            cep,
            cidade,
            uf
        } = req.body

        const dadosSalvar = {
            telefone_1,
            telefone_2,
            telefone_3,
            telefone_4,
            link_instagram,
            link_facebook,
            link_site,
            email_comercial,
            endereco,
            descricao_negocio,
            cep,
            cidade,
            uf
        }

        try{
            await ModelNegocioDados.update(dadosSalvar, {
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
            await ModelNegocioDados.destroy({
                where: {
                    id_negocio_dados: req.params.id_negocio_dados
                }
            });
            return res.status(200).json({message:"Registro deletado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}