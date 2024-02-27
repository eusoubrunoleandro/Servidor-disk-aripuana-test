const ModelCategoria = require('../models/ModelCategoria');
const con_pg = require('../database/Connection_pg.js')
const Sequelize = require('sequelize');

module.exports = {
    async busca (req, res) {
        const { search = '' } = req.query;
        try{
            const content = await ModelCategoria.findAll({
                where: {
                    [Sequelize.Op.or]:[
                        {
                            nome_categoria: {
                            [Sequelize.Op.iLike]: `%${search}%`
                            }
                        },
                        {
                            descricao_categoria: {
                                [Sequelize.Op.iLike]: `%${search}%`
                            }
                        }
                    ]
                }
            })
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async inserir(req, res){
        try{
            const join_data = Object.assign(req.body, {
                id_negocio_registro: req.sessao_negocio
            })
            const { dataValues } = await ModelCategoria.create(join_data);
            return res.status(200).json({ content: dataValues })
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async alterar(req, res){
        try{
            const { nome_categoria, descricao_categoria } = req.body;
            await ModelCategoria.update({ nome_categoria, descricao_categoria }, {
                where: {
                    id_categoria: req.params.id_categoria
                }
            });
            return res.status(200).json({message: "Categoria atualizada!"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async deletar(req, res){
        try{
            await ModelCategoria.destroy({
                where: {
                    id_categoria: req.params.id_categoria
                }
            });
            return res.status(200).json({message:"Registro deletado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}