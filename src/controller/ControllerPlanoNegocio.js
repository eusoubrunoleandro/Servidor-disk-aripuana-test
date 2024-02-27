const ModelPlanoNegocio = require('../models/ModelPlanoNegocio');
const ModelPlano = require('../models/ModelPlano');
const ModelNegocio = require('../models/ModelNegocio');

module.exports = {
    async busca (req, res) {
        try{
            const content = await ModelPlanoNegocio.findAll();
            return res.status(200).json({content})
        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async aberturaDeContaPlanoNegocio(req, res, next){
        try{

            const planoPadrao = await ModelPlano.findAll({
                where: {
                    valor: 0
                }
            })

            const dataConstrutor = new Date();
            const mes = dataConstrutor.getMonth() < 10 ? `0${dataConstrutor.getMonth()}` : dataConstrutor.getMonth();
            const dia = dataConstrutor.getDate() < 10 ? `0${dataConstrutor.getDate()}` : dataConstrutor.getDate();
            const dataFinal = `${dataConstrutor.getFullYear()}-${mes}-${dia}`;

            const join_data = {
                id_plano: planoPadrao[0].id_plano,
                id_negocio: req.id_negocio_primeiro_cadastro,
                data_adesao: dataFinal,
                data_vencimento: dataFinal,
                comentario: 'Abertura de conta',
                id_negocio_registro: req.id_negocio_primeiro_cadastro
            }

            await ModelPlanoNegocio.create(join_data);
            
            next()
        }
        catch(error){
            await ModelNegocio.destroy({
                where: { id_negocio: req.id_negocio_primeiro_cadastro }
            })
            return res.status(401).json({ message: error })
        }
    },
    async relacionarPlano(req, res, next){
        try{
            
            const id_plano = req.body.plano_negocio.substring(0, req.body.plano_negocio.indexOf(' | '));

            const dataConstrutor = new Date();
            const mes = dataConstrutor.getMonth() < 10 ? `0${dataConstrutor.getMonth()}` : dataConstrutor.getMonth();
            const dia = dataConstrutor.getDate() < 10 ? `0${dataConstrutor.getDate()}` : dataConstrutor.getDate();
            const dataFinal = `${dataConstrutor.getFullYear()}-${mes}-${dia}`;

            const join_data = {
                id_plano: id_plano,
                id_negocio: req.id_contacriada,
                data_adesao: dataFinal,
                data_vencimento: dataFinal,
                comentario: 'Abertura de conta',
                id_negocio_registro: req.sessao_negocio
            }

            await ModelPlanoNegocio.create(join_data);
            
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
        const id_plano = req.body.plano_negocio.substring(0, req.body.plano_negocio.indexOf(' | '));

        const dataConstrutor = new Date();
        const mes = dataConstrutor.getMonth() < 10 ? `0${dataConstrutor.getMonth()}` : dataConstrutor.getMonth();
        const dia = dataConstrutor.getDate() < 10 ? `0${dataConstrutor.getDate()}` : dataConstrutor.getDate();
        const dataFinal = `${dataConstrutor.getFullYear()}-${mes}-${dia}`;

        const join_data = {
            id_plano: id_plano,
            data_adesao: dataFinal,
            data_vencimento: dataFinal,
            comentario: 'Alterando plano',
            id_negocio_registro: req.sessao_negocio
        }

        try{
            await ModelPlanoNegocio.update(join_data,{
                where: {
                    id_negocio: req.params.id_negocio
                }
            });
            return res.status(200).json({message: "Conta atualizada!"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async deletar(req, res){
        try{
            await ModelPlanoNegocio.destroy({
                where: {
                    id_plano_negocio: req.params.id_plano_negocio
                }
            });
            return res.status(200).json({message:"Registro deletado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}