const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sattlement_db.sqlite'
});

class Sattlement extends Model { }
Sattlement.init({
    requestAmount: DataTypes.INTEGER,
    status: DataTypes.STRING
}, { sequelize, modelName: 'sattlement' });

module.exports = {sequelize, Sattlement};
