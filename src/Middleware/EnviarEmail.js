const NodemailerConfig = require('../setting/NodemailerConfig');

module.exports = {
    ConfirmacaoCadastro (req, res, next) {
        const link_automatico = `https://www.diskaripuana.com.br/validacao/${req.id_negocio_primeiro_cadastro}/${req.token_acesso_validacao}`

        NodemailerConfig.sendMail({
            from: process.env.SMTP_USER,
            to: req.body.email_acesso,
            subject: "Confirmação de cadastro - Disk Aripuanã",
            html: `
                <div style="display: flex; width: 100%; height: 100%; justify-content: flex-start; background: #fff; padding: 20px;">
                    <div style="width: 100%; background-color: #fff; padding: 30px;">
                        <h1 style="margin:0px; padding: 0px; color: #222;">Seja bem vindo(a) <b style="color: #04BF56">${req.body.nome_negocio}!</h1>
                        <p style="color: #222; font-weight: 100;">
                            Ficamos felizes em recebe-lo!
                        </p>
                        <p style="color: #222; font-weight: 100;">
                            Para concluirmos o seu cadastro, você precisa confirmar seu e-mail. Para realizar isso, clique no link abaixo:
                        </p>
                        <div style="color:#04BF56; width: 100%">
                            <a
                                href=${link_automatico}
                                rel="noreferrer" 
                                target="_blank" 
                                style="text-decoration: none; color: #04BF56; font-size: 16px; padding: 10px; width: 100%; height: 100%; text-align: center"
                            >
                            ${link_automatico}
                            </a>
                        </div>
                        <i style="display: block; color: #666; font-weight: 400; margin: 30px 0px;">No responda este e-mail, pois foi gerado automaticamente!</i>
                    </div>
                </div>
            `
        }).then(() => {
            next()
        }).catch(error => {
            res.status(401).json({message: error.message, error_completo: error})
        })
    },
    ConfirmacaoCadastroAdmin (req, res) {
        const link_automatico = `https://www.diskaripuana.com.br/validacao/${req.id_contacriada}/${req.token_acesso_validacao}`

        NodemailerConfig.sendMail({
            from: process.env.SMTP_USER,
            to: "diskaripuana@outlook.com",
            subject: `Confirmação de cadastro de ${req.body.nome_negocio} - Disk Aripuanã`,
            html: `
                <div style="display: flex; width: 100%; height: 100%; justify-content: flex-start; background: #fff; padding: 20px;">
                    <div style="width: 100%; background-color: #fff; padding: 30px;">
                        <h1 style="margin:0px; padding: 0px; color: #222;">Seja bem vindo(a) <b style="color: #04BF56">${req.body.nome_negocio}!</h1>
                        <p style="color: #222; font-weight: 100;">
                            Ficamos felizes em recebe-lo!
                        </p>
                        <p style="color: #222; font-weight: 100;">
                            Para concluirmos o seu cadastro, você precisa confirmar seu e-mail. Para realizar isso, clique no link abaixo:
                        </p>
                        <div style="color:#04BF56; width: 100%">
                            <a
                                href=${link_automatico}
                                rel="noreferrer" 
                                target="_blank" 
                                style="text-decoration: none; color: #04BF56; font-size: 16px; padding: 10px; width: 100%; height: 100%; text-align: center"
                            >
                            ${link_automatico}
                            </a>
                        </div>
                        <i style="display: block; color: #666; font-weight: 400; margin: 30px 0px;">No responda este e-mail, pois foi gerado automaticamente!</i>
                    </div>
                </div>
            `
        }).then(() => {
            res.status(200).json({content: {
                id_negocio: req.id_contacriada
            }})
        }).catch(error => {
            res.status(401).json({message: error})
        })
    },
    NotificaoDeNovoCadastro (req, res, next) {
        NodemailerConfig.sendMail({
            from: process.env.SMTP_USER,
            to: 'diskaripuana@outlook.com',
            subject: `Novo cadastro - ${req.body.nome_negocio}`,
            html: `
                <div style="display: flex; width: 100%; height: 100%; align-items: center;justify-content: center; background: #ddd; padding: 50px 20px;">
                    <div style="width: 100%; max-width: 600px; margin: auto; background-color: #fff; padding: 30px; box-sizing: border-box; box-shadow: 3px 3px 30px rgba(0,0,0,0.6); border-radius: 15px;">
                        <h1 style="margin:0px; padding: 0px; color: #222;">Novo cadastro</h1>
                        <p style="color: #222; font-weight: 100;">O perfil ${req.body.nome_negocio} acabou de se cadastrar no Disk Aripuanã.</p>
                        <p style="color: #222; font-weight: 500;">Dados completo:</p>
                        <p style="color: #222; font-weight: 100;">Nome do negócio: ${req.body.nome_negocio}</p>
                        <p style="color: #222; font-weight: 100;">Categoria : ${ req.body.categoria }</p>
                        <p style="color: #222; font-weight: 100;">Telefone ${req.body.telefone}</p>
                        <p style="color: #222; font-weight: 100;">E-mail de acesso ${req.body.email_acesso}</p>
                        <p style="color: #222; font-weight: 100;">CEP ${req.body.cep} | Cidade ${req.body.cidade}, ${req.body.uf} - ${req.body.pais}</p>
                    </div>
                </div>
            `
        }).then(info => {
            res.status(200).json({ message: "Cadastro concluído com sucesso! Entre no seu e-mail para validar sua conta.", info })
        }).catch(error => {
            res.status(401).json({message: error.message, error_completo: error})
        })
    },
    NotificacaoBloqueado (req, res, next) {

        const { nome_negocio, id_negocio, email_acesso, motivo_bloqueio } = req.dados_bloqueio
        NodemailerConfig.sendMail({
            from: process.env.SMTP_USER,
            to: 'diskaripuana@outlook.com',
            subject: `Perfil bloqueado tentando acessar - ${nome_negocio}`,
            html: `
                <div style="display: flex; width: 100%; height: 100%; align-items: center;justify-content: center; background: #ddd; padding: 50px 20px;">
                    <div style="width: 100%; max-width: 600px; margin: auto; background-color: #fff; padding: 30px; box-sizing: border-box; box-shadow: 3px 3px 30px rgba(0,0,0,0.6); border-radius: 15px;">
                        <h1 style="margin:0px; padding: 0px; color: #222;">O perfil <b style="color: #F20707">${nome_negocio}</b>, código ${id_negocio}, está tentando acessar o sistema!</h1>
                        <p style="color: #222; font-weight: 100;">Motivo do bloqueio: <br>${motivo_bloqueio}</p>
                        <p style="color: #222; font-weight: 100;">E-mail de acesso: ${email_acesso}</p>
                    </div>
                </div>
            `
        }).then(() => {
            res.status(200).json({ message: `Perfil bloqueado! Motivo: ${motivo_bloqueio}` })
        }).catch(error => {
            res.status(401).json({message: error.message, error_completo: error})
        })
    },
    NotificaoExclusaoDeConta (req, res, next) {
        NodemailerConfig.sendMail({
            from: process.env.SMTP_USER,
            to: 'diskaripuana@outlook.com',
            subject: `Conta excluída pelo usuário - ${req.nome_negocio}`,
            html: `
                <div style="display: flex; width: 100%; height: 100%; align-items: center;justify-content: center; background: #ddd; padding: 50px 20px;">
                    <div style="width: 100%; max-width: 600px; margin: auto; background-color: #fff; padding: 30px; box-sizing: border-box; box-shadow: 3px 3px 30px rgba(0,0,0,0.6); border-radius: 15px;">
                        <h1 style="margin:0px; padding: 0px; color: #222;">Conta excluída cadastro</h1>
                        <p style="color: #222; font-weight: 100;">O perfil ${req.body.nome_negocio} acabou de excluir a conta do Disk Aripuanã.</p>
                    </div>
                </div>
            `
        }).then(info => {
            res.status(200).json({ message: "Conta excluída com sucesso.", info })
        }).catch(error => {
            res.status(401).json({message: error.message, error_completo: error})
        })
    },
}