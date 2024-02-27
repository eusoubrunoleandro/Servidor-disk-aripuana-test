const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');

const ModelNegocio = require('./ModelNegocio');

const ModelPlano = connection.define('plano', {
    id_plano: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_plano:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    valor: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    id_negocio_registro: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, SetSequelize('plano'));

ModelNegocio.hasMany(ModelPlano, {
    foreignKey: "id_negocio_registro",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelPlano.sync({ force: true })

module.exports = ModelPlano;