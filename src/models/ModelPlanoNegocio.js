const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelNegocio = require('./ModelNegocio');
const ModelPlano = require('./ModelPlano');

const ModelPlanoNegocio = connection.define('plano_negocio', {
    id_plano_negocio: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_negocio: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_plano: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    data_adesao:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    comentario: {
        type: Sequelize.STRING(400),
        allowNull: false
    },
    data_vencimento:{
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    id_negocio_registro: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, SetSequelize('plano_negocio'));

ModelNegocio.hasMany(ModelPlanoNegocio, {
    foreignKey: "id_negocio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

ModelNegocio.hasMany(ModelPlanoNegocio, {
    foreignKey: "id_negocio_registro",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

ModelPlano.hasMany(ModelPlanoNegocio, {
    foreignKey: "id_plano",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelPlanoNegocio.sync({ force: true })

module.exports = ModelPlanoNegocio;