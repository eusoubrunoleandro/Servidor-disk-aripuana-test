const connection_pg = require('../database/Connection_pg');

module.exports = {
    async TotalNegocios (req, res) {
        try{
            const { rows : content } = await connection_pg.query(`SELECT COUNT(nome_negocio) AS total FROM view_negocio_completo`)
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}

// SELECT COUNT(nome_negocio) AS total FROM view_negocio_completo;
// SELECT modo_premium, COUNT(*) AS total FROM view_negocio_completo GROUP BY modo_premium;
// SELECT cidade, uf, COUNT(*) AS total FROM view_negocio_completo GROUP BY cidade, uf;
// SELECT id_categoria, nome_categoria, COUNT(*) AS total FROM view_negocio_completo GROUP BY nome_categoria, id_categoria;
// SELECT nome_plano, id_plano, COUNT(*) AS total FROM view_negocio_completo GROUP BY nome_plano, id_plano;
// SELECT conta_verificada, COUNT(*) AS total FROM view_negocio_completo GROUP BY conta_verificada;