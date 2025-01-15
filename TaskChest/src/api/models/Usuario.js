const { Model, DataTypes } = require('sequelize');
const database = require('./database');

class Usuario extends Model {}

Usuario.init(
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        senha: {
            type: DataTypes.STRING
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize: database,
        timestamps: false,
    }
);

module.exports = Usuario;