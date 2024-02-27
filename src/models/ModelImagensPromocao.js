const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');

const ModelImagensPromocao = connection.define('imagens_promocao', {
    id_imagem_promocao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_promocao: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    url_imagem: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, SetSequelize('imagens_promocao'));

// ModelImagensPromocao.sync({ force: true })

module.exports = ModelImagensPromocao;