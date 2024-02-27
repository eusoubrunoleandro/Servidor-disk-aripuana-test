const ModelEmpreendedores = require('../models/ModelEmpreendedores');
const pg = require('../database/Connection_pg')

module.exports = {
    async listaNegocios (req, res) {
        const { search = " ", categoria = '' } = req.query;

        const bindParams = [`%${search}%`]
        if(categoria !== ""){
            bindParams.push(categoria)
        }

        try{
            const { rows : content } = await pg.query(
                `SELECT * FROM view_negocio_completo WHERE nome_negocio ILIKE $1 ${ categoria !== '' ? "and id_categoria=$2" : ""  } AND empreendedor is not null ORDER BY modo_premium DESC`,
                bindParams
            )
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async listaAdmin (req, res) {
        const { search = " " } = req.query;

        const bindParams = [`%${search}%`]

        try{
            const { rows : content } = await pg.query(
                `SELECT * FROM view_negocio_completo WHERE (nome_negocio ILIKE $1 OR nome_categoria ILIKE $1) ORDER BY empreendedor`,
                bindParams
            )
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async inserir(req, res){
        try{
            const { id_negocio } = req.body;
            await ModelEmpreendedores.create({ id_negocio });
            return res.status(200).json({ message: "Adicionado ao catálogo!" })
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async deletar(req, res){
        try{
            await ModelEmpreendedores.destroy({
                where: {
                    id_negocio: req.body.id_negocio
                }
            });
            return res.status(200).json({message:"Removido do catálogo"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}