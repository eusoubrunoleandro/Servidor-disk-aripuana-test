const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');

const ModelNegocio = connection.define('negocio', {
    id_negocio: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_negocio:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    email_acesso:{
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
    },
    modo_premium: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    conta_verificada:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue: false
    },
    data_verificacao_conta:{
        type: Sequelize.DATE,
        allowNull:true
    },
    token_acesso: {
        type: Sequelize.STRING(200),
        allowNull: true
    }
}, SetSequelize('negocio'));

// ModelNegocio.sync({ force: true })

module.exports = ModelNegocio;