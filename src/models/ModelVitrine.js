const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelNegocio = require('./ModelNegocio');

const ModelVitrine = connection.define('vitrine', {
    id_vitrine: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_negocio: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    url_arquivo: {
        type: Sequelize.STRING(400),
        allowNull: false
    },
    sequencia: {
        type: Sequelize.STRING(2),
        allowNull: true
    },
    destaque: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, SetSequelize('vitrine'));

ModelNegocio.hasMany(ModelVitrine, {
    foreignKey: "id_negocio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelVitrine.sync({ force: true })

module.exports = ModelVitrine;