const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('database','','',{
    dialect: 'sqlite',
    storage: './database/database.sqlite',
});

sequelize.authenticate().then( () => {
    console.log("Conexion con la base de datos hecha exitosamente");
});

module.exports = sequelize;