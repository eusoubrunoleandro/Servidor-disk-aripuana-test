const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelNegocio = require('./ModelNegocio');

const ModelCategoria = connection.define('categoria', {
    id_categoria: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_categoria:{
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    descricao_categoria: {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    icone_categoria: {
        type: Sequelize.STRING(300),
        allowNull: true
    },
    id_negocio_registro: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, SetSequelize('categoria'));

ModelNegocio.hasMany(ModelCategoria, {
    foreignKey: "id_negocio_registro",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelCategoria.sync({ force: true })

module.exports = ModelCategoria;