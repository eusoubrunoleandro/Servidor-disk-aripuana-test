const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelNegocio = require('./ModelNegocio');

const ModelEmpreendedores = connection.define('programa_empreendedores', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_negocio:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    observacao: {
        type: Sequelize.STRING(100),
        allowNull: true,
    }
}, SetSequelize('programa_empreendedores'));

ModelNegocio.hasMany(ModelEmpreendedores, {
    foreignKey: "id_negocio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelEmpreendedores.sync({ force: true })

module.exports = ModelEmpreendedores;