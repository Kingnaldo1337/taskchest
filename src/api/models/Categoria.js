const { Model, DataTypes } = require('sequelize');
const database = require('./database');

class Categoria extends Model {}

Categoria.init(
    {
        nome: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    },
    {
        sequelize: database,
        timestamps: false,
    }
)

module.exports = Categoria;