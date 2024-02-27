const ModelCategoriaNegocio = require('../models/ModelCategoriaNegocio');
const ModelNegocio = require('../models/ModelNegocio');

module.exports = {
    async busca (req, res) {
        try{
            const content = await ModelCategoriaNegocio.findAll();
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async aberturaDeContaCategoriaNegocio(req, res, next){
        try{
            const id_categoria = req.body.categoria.substring(0, req.body.categoria.indexOf(' - '));

            const join_data = {
                id_categoria: id_categoria,
                id_negocio: req.id_negocio_primeiro_cadastro,
                id_negocio_registro: req.id_negocio_primeiro_cadastro
            }
            await ModelCategoriaNegocio.create(join_data);
            next()
        }
        catch(error){
            await ModelNegocio.destroy({
                where: { id_negocio: req.id_negocio_primeiro_cadastro }
            })
            return res.status(401).json({ message: error })
        }
    },
    async relacionarCategoria(req, res, next){
        try{
            const id_categoria = req.body.categoria.substring(0, req.body.categoria.indexOf(' - '));

            const join_data = {
                id_categoria: id_categoria,
                id_negocio: req.id_contacriada,
                id_negocio_registro: req.sessao_negocio
            }
            await ModelCategoriaNegocio.create(join_data);
            next()
        }
        catch(error){
            await ModelNegocio.destroy({
                where: { id_negocio: req.id_contacriada }
            })
            return res.status(401).json({ message: error })
        }
    },
    async alterar(req, res, next){

        const id_categoria = req.body.categoria.substring(0, req.body.categoria.indexOf(' - '));
        const join_data = {
            id_categoria: id_categoria,
            id_negocio_registro: req.sessao_negocio
        }
        
        try{
            await ModelCategoriaNegocio.update(join_data, {
                where: {
                    id_negocio: req.params.id_negocio
                }
            });

            if(req.body.plano_negocio === null || req.body.plano_negocio === undefined){
                return res.status(200).json({ message: "Conta atualizada!" })
            }
            next();
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async deletar(req, res){
        try{
            await ModelCategoriaNegocio.destroy({
                where: {
                    id_categoria_negocio: req.params.id_categoria_negocio
                }
            });
            return res.status(200).json({message:"Registro deletado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async alterarMinhaCategoria(req, res, next){
        try{
            const { categoria } = req.body;
            const id_categoria = categoria.substring(0, categoria.indexOf(' - '));

            await ModelCategoriaNegocio.update({ id_categoria },{
                where: {
                    id_negocio: req.sessao_negocio
                }
            });
            return res.status(200).json({message:"Dados iniciais atualizados!"})
            next();
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
}