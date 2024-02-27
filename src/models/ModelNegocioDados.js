const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelNegocio = require('./ModelNegocio');

const ModelNegocioDados = connection.define('negocio_dados', {
    id_negocio_dados: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_negocio: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    image_perfil: {
        type: Sequelize.STRING(400),
        allowNull: true
    },
    descricao_negocio: {
        type: Sequelize.STRING(500),
        allowNull: true
    },
    link_site: {
        type: Sequelize.STRING(400),
        allowNull: true
    },
    link_instagram: {
        type: Sequelize.STRING(400),
        allowNull: true
    },
    link_site: {
        type: Sequelize.STRING(400),
        allowNull: true
    },
    link_facebook: {
        type: Sequelize.STRING(400),
        allowNull: true
    },
    email_comercial: {
        type: Sequelize.STRING(400),
        allowNull: true,
        unique: true
    },
    endereco: {
        type: Sequelize.STRING(400),
        allowNull: true
    },
    cep: {
        type: Sequelize.STRING(9),
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    uf: {
        type: Sequelize.STRING(2),
        allowNull: false,
        defaultValue: "MT"
    },
    pais: {
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: "Brasil"
    },
    imagem_destaque: {
        type: Sequelize.STRING(400),
        allowNull: true
    },
    telefone_1: {
        type: Sequelize.ARRAY(Sequelize.STRING(11)),
        allowNull: true
    },
    telefone_2: {
        type: Sequelize.ARRAY(Sequelize.STRING(11)),
        allowNull: true
    },
    telefone_3: {
        type: Sequelize.ARRAY(Sequelize.STRING(11)),
        allowNull: true
    },
    telefone_4: {
        type: Sequelize.ARRAY(Sequelize.STRING(11)),
        allowNull: true
    },
    id_negocio_registro: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, SetSequelize('negocio_dados'));

ModelNegocio.hasMany(ModelNegocioDados, {
    foreignKey: "id_negocio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

ModelNegocio.hasMany(ModelNegocioDados, {
    foreignKey: "id_negocio_registro",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelNegocioDados.sync({ force: true })

module.exports = ModelNegocioDados;