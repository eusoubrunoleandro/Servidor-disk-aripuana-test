const ModelNegocioDados = require('../models/ModelNegocioDados');
const ModelVitrine = require('../models/ModelVitrine')

const multer = require('multer')
const multerConfig = require('../setting/multer')
const multerVitrine = require('../setting/multerVitrine');
const multerPromocao = require('../setting/MulterPromocao');
const ModelImagensPromocao = require('../models/ModelImagensPromocao');

module.exports = {
    async uploadImagePerfil(req, res) {

        const upload = multer(multerConfig).single('image_perfil')

        upload(req, res, async (error) => {multerVitrine
            if (error instanceof multer.MulterError) {
                return res.status(401).json({ message: "Erro durante o upload da imagem do perfil" });
            } else if (error) {
                return res.status(401).json({ message: "Erro inesperado no upload da imagem do perfil" });
            }

            if(req.file === undefined) return res.status(401).json({ message: "Problemas no envio de arquivos! Verifique se você realmente está enviando uma imagem!" });

            const { location } = req.file;
            
            if(location === '' || location === undefined) return res.status(401).json({ message: "É necessário uma imagem!" });

            try {
                await ModelNegocioDados.update({image_perfil: location},{
                    where: {
                        id_negocio: req.sessao_negocio
                    }
                })
    
                return res.status(200).json({ url_image: location });
            } catch (error) { return res.status(401).json({ message: error }) }

        })
    },
    async addImagemVitrine(req, res) {

        const upload = multer(multerVitrine).single('imagem_vitrine')

        upload(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                return res.status(401).json({ message: "Erro durante o upload da imagem da vitrine" });
            } else if (error) {
                return res.status(401).json({ message: "Erro inesperado no upload da imagem da vitrine" });
            }

            if(req.file === undefined) return res.status(401).json({ message: "Problemas no envio de arquivos! Verifique se você realmente está enviando uma imagem!" });

            const { location } = req.file;
            
            if(location === '' || location === undefined) return res.status(401).json({ message: "É necessário uma imagem!" });

            const { sequencia, destaque } = req.body;
            const dados = {
                id_negocio: req.sessao_negocio,
                url_arquivo: location,
                sequencia,
                destaque
            }

            try {
                const VerificandoSequencia = await ModelVitrine.findAll({
                    where: {
                        id_negocio: req.sessao_negocio,
                        sequencia
                    }
                })
                if(VerificandoSequencia.length){
                    await ModelVitrine.destroy({ where: {
                        id_vitrine: VerificandoSequencia[0].id_vitrine
                    } })
                }

                const dadosCadastrados = await ModelVitrine.create(dados)
    
                return res.status(200).json({ content: dadosCadastrados });
            } catch (error) { return res.status(401).json({ message: error }) }

        })
    },
    async adicionarImagemPromocao(req, res) {
        const { id_promocao } = req.params;
        if(id_promocao === null || id_promocao === undefined || id_promocao === ""){
            return res.status(401).json({ message: "Nenhuma promoção informada!" })
        }

        const upload = multer(multerPromocao).single('imagem_promocao')

        upload(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                return res.status(401).json({ message: "Erro durante o upload da imagem da promoção!" });
            } else if (error) {
                return res.status(401).json({ message: "Erro inesperado no upload da imagem da promoção!" });
            }

            if(req.file === undefined) return res.status(401).json({ message: "Problemas no envio de arquivos! Verifique se você realmente está enviando uma imagem!" });

            const { location } = req.file;
            
            if(location === '' || location === undefined) return res.status(401).json({ message: "É necessário uma imagem!" });

            try {

                const dados = await ModelImagensPromocao.create({ 
                    id_promocao,
                    url_imagem: location
                 })
                return res.status(200).json({ content: dados });

            } catch (error) { return res.status(401).json({ message: error }) }

        })
    },
}