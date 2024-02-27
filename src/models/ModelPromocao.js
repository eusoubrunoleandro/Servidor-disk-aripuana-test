const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelImagensPromocao = require('./ModelImagensPromocao');
const ModelNegocio = require('./ModelNegocio');

const ModelPromocao = connection.define('promocao', {
    id_promocao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_negocio: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    nome_promocao: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    descricao_promocao: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    inicio_promocao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    fim_promocao: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    publicar: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    imagem_capa_promocao: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    id_negocio_registro: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, SetSequelize('promocao'));

ModelNegocio.hasMany(ModelPromocao, {
    foreignKey: "id_negocio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

ModelNegocio.hasMany(ModelPromocao, {
    foreignKey: "id_negocio_registro",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

ModelImagensPromocao.hasMany(ModelPromocao, {
    foreignKey: "imagem_capa_promocao",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelPromocao.sync({ force: true })

module.exports = ModelPromocao;