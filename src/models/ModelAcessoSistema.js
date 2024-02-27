const Sequelize = require('sequelize');
const connection = require('../database/SequelizeConnect');
const SetSequelize = require('../setting/SequelizeConfig');
const ModelNegocio = require('./ModelNegocio');

const ModelAcessoSistema = connection.define('acesso_sistema', {
    id_acesso: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_negocio:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    senha_acesso:{
        type: Sequelize.STRING(500),
        allowNull: false,
    },
    bloqueado:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    motivo_bloqueio:{
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    data_bloqueio:{
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    tipo_acesso: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 1
    }
}, SetSequelize('acesso_sistema'));

ModelNegocio.hasMany(ModelAcessoSistema, {
    foreignKey: "id_negocio",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
})

// ModelAcessoSistema.sync({ force: true })

module.exports = ModelAcessoSistema;