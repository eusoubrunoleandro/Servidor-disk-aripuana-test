const ModelPromocao = require('../models/ModelPromocao');
const conexao = require('../database/Connection_pg');


module.exports = {
    async minhasPromocoes (req, res) {
        try{
            const { rows : content } = await conexao.query(
                `SELECT * FROM view_promocao where id_negocio=$1`,
                [req.sessao_negocio]
            );
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async buscaPublica (req, res) {
        const { tipo } = req.body;

        const comando = {
            query: `SELECT * FROM view_promocao where publicar='true' and bloqueado='false' and conta_verificada='true'`,
            bindParams: []
        }

        if(tipo === "dia"){
            const construtorData = new Date();
            const datasMenoresQueDez = (numero) =>{
                return numero < 10 ? `0${numero}` : numero
            }
            const hoje = `${construtorData.getFullYear()}-${datasMenoresQueDez(construtorData.getMonth())}-${datasMenoresQueDez(construtorData.getDate())}`;

            comando.query = `SELECT * FROM view_promocao where (publicar='true' and bloqueado='false' and conta_verificada='true') and ((inicio_promocao between $1 and $2) or (fim_promocao between $1 and $2))`
            comando.bindParams = [hoje, hoje]
        }

        if(tipo === "semana"){
            const construtorData = new Date();
            const datasMenoresQueDez = (numero) =>{
                return numero < 10 ? `0${numero}` : numero
            }
            const hoje = `${construtorData.getFullYear()}-${datasMenoresQueDez(construtorData.getMonth())}-${datasMenoresQueDez(construtorData.getDate())}`;

            const diaSemana = construtorData.getDay();
            const diasAteOFinalDaSemana = 6 - diaSemana
            const dataSomada = construtorData.setDate(construtorData.getDate() + diasAteOFinalDaSemana)
            const dataFinal = new Date(dataSomada)

            const dataFinalFormatada = `${dataFinal.getFullYear()}-${datasMenoresQueDez(dataFinal.getMonth())}-${datasMenoresQueDez(dataFinal.getDate())}`;

            comando.query = `SELECT * FROM view_promocao where (publicar='true' and bloqueado='false' and conta_verificada='true') and ((inicio_promocao between $1 and $2) or (fim_promocao between $1 and $2))`
            comando.bindParams = [hoje, dataFinalFormatada]
        }

        try{
            const { rows : content } = await conexao.query(
                comando.query,
                comando.bindParams
            );
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async buscaPerfilPublico (req, res) {
        try{
            const { rows : content } = await conexao.query(
                `SELECT * FROM view_promocao where id_promocao=$1 and publicar='true' and bloqueado='false' and conta_verificada='true'`,
                [req.params.id_promocao]
            );
            return res.status(200).json({content: content[0]})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async inserir(req, res){
        try{
            const { nome_promocao, descricao_promocao, inicio_promocao, fim_promocao } = req.body
            const join_data = {
                id_negocio: req.sessao_negocio,
                nome_promocao,
                descricao_promocao,
                inicio_promocao,
                fim_promocao,
                id_negocio_registro: req.sessao_negocio
            }
            const { dataValues: content } = await ModelPromocao.create(join_data);
            return res.status(200).json({ content: Object.assign(content, { url_imagem: null }) })
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async alterar(req, res){
        try{
            await ModelPromocao.update(req.body,{
                where: {
                    id_promocao: req.params.id_promocao
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
            await ModelPromocao.destroy({
                where: {
                    id_promocao: req.params.id_promocao
                }
            });
            return res.status(200).json({message:"Registro deletado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}