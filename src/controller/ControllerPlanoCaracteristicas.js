const ModelPlanoCaracteristicas = require('../models/ModelPlanoCaracteristicas');

module.exports = {
    async listarCaracteristicas (req, res) {
        try{
            const content = await ModelPlanoCaracteristicas.findAll({
                where: {
                    id_plano: req.params.id_plano
                }
            });
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async cadastrarCaracteristica(req, res){
        try{
            const { caracteristica, id_plano } = req.body;
            console.log(req.body)

            if(id_plano ==="" || id_plano === undefined || id_plano === null){
                return res.status(401).json({ message: "Nenhum plano vinculado a essa caracteristicas!" })
            }

            const { dataValues } = await ModelPlanoCaracteristicas.create({ caracteristica, id_plano, id_negocio_registro: req.sessao_negocio });
            return res.status(200).json({ content: dataValues })
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async deletar(req, res){
        try{
            await ModelPlanoCaracteristicas.destroy({
                where: {
                    id_plano_caracteristica: req.params.id_plano_caracteristica
                }
            });
            return res.status(200).json({message:"Excluido!"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}