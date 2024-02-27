const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const typeStorageUpload = {
    servidorImagens: multerS3({
        s3: new aws.S3({ 
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }),
        bucket: 'imagensdiskaripuana',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const mimetypesAllowed = [
                'image/png',
                'image/jpeg',
                'image/jpg'
            ];

            if(!mimetypesAllowed.includes(file.mimetype)) cb(new Error('Tipo de imagem não aceito!'))
            const extensao = file.mimetype

            const nomeFinal = `ImagensPerfil/perfil-${req.sessao_negocio}.${extensao.substring(6, extensao.length)}`
            // const nomeFinal = `ImagensPerfil/perfil-${req.sessao_negocio}${Date.now()}.${extensao.substring(6, extensao.length)}`
            cb(null, nomeFinal)
        }
    })
}

module.exports = {
    storage: typeStorageUpload.servidorImagens,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
}