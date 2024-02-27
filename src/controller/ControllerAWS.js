const ModelNegocioDados = require('../models/ModelNegocioDados');
const { ListObjectsCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../setting/BucketAWS')

module.exports = {
    async ListarImagens(req, res) {
        try {
            const bucketParams = { Bucket: process.env.AWS_BUCKET }
            const response = await s3Client.send(new ListObjectsCommand(bucketParams))
            const files = response.Contents.forEach(item => {
                console.log(item.Key)
            })
            res.json({files})
        } catch (error) {
            console.log(error)
            res.json(error)
        }
    },
    async ExcluirImagemPerfilAtual(req, res, next) {
        try {
            const content = await ModelNegocioDados.findAll({ where: { id_negocio: req.sessao_negocio }});
            const url_image = content[0].image_perfil;
            const url_default = "https://diskaripuana.s3.sa-east-1.amazonaws.com/"
            const Key = url_image.substring(url_default.length, 100);
            console.log(Key)

            const bucketParams = { Bucket: process.env.AWS_BUCKET, Key }
            await s3Client.send(new DeleteObjectCommand(bucketParams))

            next()
        } catch (error) { return res.status(401).json({ message: error }) }
    }
}