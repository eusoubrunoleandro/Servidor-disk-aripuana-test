const connection_pg = require('../database/Connection_pg');
module.exports = {
    async relatorio_negocio (req, res) {
        try{
            const { rows : total_negocios } = await connection_pg.query("Select count(id_negocio) as total_negocios from view_negocio_completo", [])
            const { rows : total_negocios_bloqueados } = await connection_pg.query("Select count(id_negocio) as total_negocios_bloqueados from view_negocio_completo where bloqueado=true", [])
            const { rows : total_negocios_verificados } = await connection_pg.query("Select count(id_negocio) as total_negocios_verificados from view_negocio_completo where conta_verificada=true", [])
            const { rows : total_negocios_premium } = await connection_pg.query("Select count(id_negocio) as total_negocios_premium from view_negocio_completo where modo_premium=true", [])
            const { rows : total_negocios_empreendedor } = await connection_pg.query("Select count(id_negocio) as total_negocios_empreendedor from view_negocio_completo where empreendedor IS NOT NULL", [])

            return res.status(200).json({content:{
                total_negocios:total_negocios[0].total_negocios,
                total_negocios_bloqueados:total_negocios_bloqueados[0].total_negocios_bloqueados,
                total_negocios_premium:total_negocios_premium[0].total_negocios_premium,
                total_negocios_verificados:total_negocios_verificados[0].total_negocios_verificados,
                total_negocios_empreendedor:total_negocios_empreendedor[0].total_negocios_empreendedor,
            }})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async relatorio_localidades (req, res) {
        try{
            const { rows : cidades } = await connection_pg.query("Select distinct(cidade) as cidades from view_negocio_completo", [])
            const { rows : estados } = await connection_pg.query("Select distinct(uf) as estados from view_negocio_completo", [])

            return res.status(200).json({content:{
                cidades,
                estados
            }})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
}