const { Model, DataTypes } = require('sequelize');
const database = require('./database');

class Tarefa extends Model {}

Tarefa.init(
    {
        titulo: DataTypes.STRING,
        descricao: DataTypes.STRING,
        prazo: DataTypes.DATEONLY,
        status: DataTypes.BOOLEAN,
    },
    {
        sequelize: database,
        timestamps: false,
    }
);

module.exports = Tarefa;