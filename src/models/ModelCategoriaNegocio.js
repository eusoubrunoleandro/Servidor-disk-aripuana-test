const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelCategoria = require('./ModelCategoria');
const ModelNegocio = require('./ModelNegocio');

const ModelCategoriaNegocio = connection.define('categoria_negocio', {
    id_categoria_negocio: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_categoria:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_negocio: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, SetSequelize('categoria_negocio'));

ModelNegocio.hasMany(ModelCategoriaNegocio, {
    foreignKey: "id_negocio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

ModelCategoria.hasMany(ModelCategoriaNegocio, {
    foreignKey: "id_categoria",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelCategoriaNegocio.sync({ force: true })

module.exports = ModelCategoriaNegocio;