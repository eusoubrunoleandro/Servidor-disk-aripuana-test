const ModelPlano = require('../models/ModelPlano');

module.exports = {
    async busca (req, res) {
        try{
            const content = await ModelPlano.findAll({order: [['valor', 'DESC']]});
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async inserir(req, res){
        try{
            const join_data = Object.assign(req.body, {
                id_negocio_registro: req.sessao_negocio
            })
            const { dataValues } = await ModelPlano.create(join_data);
            return res.status(200).json({ content: dataValues })
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async alterar(req, res){
        try{
            await ModelPlano.update(req.body,{
                where: {
                    id_plano: req.params.id_plano
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
            await ModelPlano.destroy({
                where: {
                    id_plano: req.params.id_plano
                }
            });
            return res.status(200).json({message:"Registro deletado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}