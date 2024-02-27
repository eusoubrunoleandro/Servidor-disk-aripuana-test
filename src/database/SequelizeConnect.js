const {Sequelize} = require('sequelize');
const connection = new Sequelize(process.env.CONNECTION_URL);
module.exports = connection