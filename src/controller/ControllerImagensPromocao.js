const ModelImagensPromocao = require('../models/ModelImagensPromocao');
const ModelPromocao = require('../models/ModelPromocao');

module.exports = {
    async listarImagensPromocao (req, res) {
        const { id_promocao } = req.params;
        if(id_promocao === null || id_promocao === undefined || id_promocao === ""){
            return res.status(401).json({ message: "Nenhuma promoção informada para pesquisa!" })
        }

        try{
            const content = await ModelImagensPromocao.findAll({ where: { id_promocao } });
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async deletarImagem(req, res){
        try{
            await ModelImagensPromocao.destroy({
                where: {
                    id_imagem_promocao: req.params.id_imagem_promocao
                }
            });
            return res.status(200).json({message:"Imagem deletada!"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}