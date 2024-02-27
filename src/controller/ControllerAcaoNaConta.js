const ModelAcessoSistema = require('../models/ModelAcessoSistema');
const ModelNegocio = require('../models/ModelNegocio');

module.exports = {
    async bloqueioConta (req, res) {
        try{
            
            const { bloqueado, motivo_bloqueio } = req.body;

            if(!req.params.id_negocio) return res.status(401).json({ message: "Nenhuma conta informada!" })
            if(bloqueado === null || bloqueado === "" || bloqueado === undefined) return res.status(401).json({ message: "Status da conta não informado! Escolha se está bloqueada ou não!" })

            const corpoRequisicao = {
                bloqueado,
                motivo_bloqueio
            }

            await ModelAcessoSistema.update( corpoRequisicao ,{
                where: {
                    id_negocio: req.params.id_negocio
                }
            });
            return res.status(200).json({message: bloqueado ? "Conta bloqueada!" : "Conta desbloqueada"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async validacaoDeConta (req, res) {
        try{
            
            const { id_negocio, token_acesso } = req.params;

            if(id_negocio === "" || id_negocio === undefined) return res.status(401).json({ message: "Link está quebrado!" })
            if(token_acesso === "" || token_acesso === undefined) return res.status(401).json({ message: "Link está quebrado!" })

            const resultado = await ModelNegocio.findAll({
                where: {
                    id_negocio
                }
            });

            if(resultado[0].token_acesso !== token_acesso ) { return res.status(401).json({ message: "Token de validação não é o mesmo cadastrado!" }) }

            if(resultado[0].conta_verificada) { return res.status(200).json({ message: "Conta já está validada!" }) }

            if(!resultado.length) { return res.status(401).json({ message: "Conta não encontrada!" }) }

            const dados = {
                conta_verificada: true,
                token_acesso: '',
                data_verificacao_conta: new Date()
            }

            await ModelNegocio.update( dados , { 
                where: {
                    id_negocio
                }
            })

            return res.status(200).json({message: "Validação concluída com sucesso"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    }
}