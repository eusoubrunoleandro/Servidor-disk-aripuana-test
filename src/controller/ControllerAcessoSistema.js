const ModelAcessoSistema = require('../models/ModelAcessoSistema');
const Bcrypt = require('bcrypt');
const ModelNegocio = require('../models/ModelNegocio');
const CriadordeToken = require('../setting/geracaoToken');
const connection_pg = require('../database/Connection_pg');

module.exports = {
    async logar (req, res, next) {
        try{
            const { email_acesso, senha_acesso } = req.body;
            
            const { rowCount, rows : content } = await connection_pg.query(
                'SELECT * FROM view_acesso_negocio WHERE email_acesso=$1',
                [email_acesso]
            )

            if(!rowCount) return res.status(401).json({ message: "E-mail não cadastrado!" })

            const { id_negocio, nome_negocio, bloqueado, senha_acesso : senha_acesso_db, tipo_acesso } = content[0];
            if(bloqueado) {
                req.dados_bloqueio = content[0]
                return next();
            }

            if(!content[0].conta_verificada) return res.status(401).json({ message: "Sua conta não foi verificada ainda! Entre no seu e-mail e valide sua conta." })

            const comparandoSenhas = await Bcrypt.compare(senha_acesso, senha_acesso_db)
            if(!comparandoSenhas) return res.status(401).json({ message: "E-mail ou senha incorretos!" })

            const { rows : conteudo_imagem } = await connection_pg.query(
                'SELECT image_perfil FROM view_negocio_perfil WHERE id_negocio=$1',
                [id_negocio]
            )

            return res.status(200).json({
                token_acesso: CriadordeToken({id_negocio, tipo_acesso, bloqueado}),
                negocio: id_negocio,
                nome_negocio,
                tipo_acesso,
                image_perfil: conteudo_imagem[0].image_perfil
            })
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async inserir(req, res, next){
        try{
            const { senha_acesso } = req.body;
            if(senha_acesso === undefined || senha_acesso === '') {
                await ModelNegocio.destroy({
                    where: { id_negocio: req.id_negocio_primeiro_cadastro }
                })
                return res.status(401).json({ message: "Verifique o campo senha! Tipo de dados incorretos ou vazio." });
            }

            const senhaCriptografada = await Bcrypt.hash(senha_acesso, 10);

            const join_data = {
                id_negocio: req.id_negocio_primeiro_cadastro,
                senha_acesso: senhaCriptografada,
                id_negocio_registro: req.id_negocio_primeiro_cadastro
            }
            const { dataValues } = await ModelAcessoSistema.create(join_data);
            req.id_acesso_primeiro_cadastro = dataValues.id_acesso
            next()
        }
        catch(error){
            await ModelNegocio.destroy({
                where: { id_negocio: req.id_negocio_primeiro_cadastro }
            })
            return res.status(401).json({ message: error })
        }
    },
    async criarAcesso(req, res, next){
        try{

            const senhaCriptografada = await Bcrypt.hash('disk123456', 10);

            const join_data = {
                id_negocio: req.id_contacriada,
                senha_acesso: senhaCriptografada,
                id_negocio_registro: req.sessao_negocio
            }
            const { dataValues } = await ModelAcessoSistema.create(join_data);
            req.id_acesso_primeiro_cadastro = dataValues.id_acesso
            next()
        }
        catch(error){
            await ModelNegocio.destroy({
                where: { id_negocio: req.id_contacriada }
            })
            return res.status(401).json({ message: error })
        }
    },
    async alterar(req, res){
        try{
            await ModelAcessoSistema.update(req.body,{
                where: {
                    id_acesso: req.params.id_acesso
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
            await ModelAcessoSistema.destroy({
                where: {
                    id_acesso: req.params.id_acesso
                }
            });
            return res.status(200).json({message:"Registro deletado"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async VerificarSenha (req, res, next) {
        try{
            const { senha } = req.body;

            if(senha === undefined || senha === null || senha === '') {
                return res.status(401).json({ message: "Senha não informada!" })
            }
            
            const { rowCount, rows : content } = await connection_pg.query(
                'SELECT senha_acesso, nome_negocio FROM view_acesso_negocio WHERE id_negocio=$1',
                [req.sessao_negocio]
            )

            const { senha_acesso, nome_negocio } = content[0];

            const comparandoSenhas = await Bcrypt.compare(senha, senha_acesso)
            if(!comparandoSenhas) return res.status(401).json({ message: "Senha incorreta!" })

            req.nome_negocio = nome_negocio
            next();

        }
        catch(error){
            return res.status(401).json({ message: error.message })
        }
    },
    async AlterarMinhaSenha(req, res){
        try{
            const { senha_nova } = req.body;
            if(senha_nova === "" || senha_nova === undefined) {
                return res.status(401).json({ message: "Uma senha é necessária!" })
            }

            const senha_acesso = await Bcrypt.hash(senha_nova, 10);

            await ModelAcessoSistema.update({ senha_acesso },{
                where: {
                    id_negocio: req.sessao_negocio
                }
            });
            return res.status(200).json({message: "Senha atualizada!"})
        }
        catch(error){
            return res.status(401).json({ message: error })
        }
    },
    async atualizandoMeuTipoAcesso(req, res){
        try{
            const content = await ModelAcessoSistema.findAll({
                where: {
                    id_negocio: req.sessao_negocio
                }
            });

            
        }
        catch(error){ return res.status(401).json({ message: error }) }
    },
}