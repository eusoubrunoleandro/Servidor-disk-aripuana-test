const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelNegocio = require('./ModelNegocio');
const ModelPlano = require('./ModelPlano');

const ModelPlanoCaracteristicas = connection.define('plano_caracteristicas', {
    id_plano_caracteristica: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_plano:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    caracteristica: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    id_negocio_registro: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, SetSequelize('plano_caracteristicas'));

ModelNegocio.hasMany(ModelPlanoCaracteristicas, {
    foreignKey: "id_negocio_registro",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

ModelPlano.hasMany(ModelPlanoCaracteristicas, {
    foreignKey: "id_plano",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelPlanoCaracteristicas.sync({ force: true })

module.exports = ModelPlanoCaracteristicas;