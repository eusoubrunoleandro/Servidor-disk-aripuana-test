const ModelVitrine = require('../models/ModelVitrine');

module.exports = {
    async busca (req, res) {
        try{
            const content = await ModelVitrine.findAll({
                where: {
                    id_negocio: req.sessao_negocio
                }
            });
            return res.status(200).json({content})
        }
        catch(error){ return res.status(401).json({ message: error }) }
    },
    async inserir(req, res){
        try{
            const { arquivo, legenda } = req.body;
            const { dataValues } = await ModelVitrine.create({ arquivo, legenda });
            return res.status(200).json({ dataValues })
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async alterar(req, res){
        try{
            await ModelVitrine.update(req.body,{
                where: {
                    id_categoria_negocio: req.params.id_categoria_negocio
                }
            });
            return res.status(200).json({message: "Registro atualizado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async deletar(req, res){
        try{
            await ModelVitrine.destroy({
                where: {
                    id_vitrine: req.params.id_vitrine
                }
            });
            return res.status(200).json({message:"Imagem deletada"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}