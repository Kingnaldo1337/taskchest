const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres'});

module.exports = database;

const Tarefa = require('./Tarefa');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');

Usuario.hasMany(Tarefa);
Tarefa.belongsTo(Usuario);

Categoria.hasMany(Tarefa, {foreignKey: 'CategoriaNome'});
Tarefa.belongsTo(Categoria, {foreignKey: 'CategoriaNome'});

database.sync({force: true}).then(console.log('\n Banco de dados sincronizado!')).then(async () => { await Categoria.bulkCreate([ { nome: 'estudos' }, { nome: 'trabalho' }, { nome: 'dia-a-dia' }, { nome: 'outros' }]) });

module.exports = { Usuario, Tarefa, Categoria}