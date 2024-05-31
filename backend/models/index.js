const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

class TestDB extends Model { }
TestDB.init({
    requestAmount: DataTypes.INTEGER,
    responseAmount: DataTypes.INTEGER,
    status: DataTypes.STRING
}, { sequelize, modelName: 'testDB' });

module.exports = {sequelize, TestDB};
