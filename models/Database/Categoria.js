const { sequelize, Sequelize } = require('./Database')

const Categoria = sequelize.define('Services', {
  nomedacategoria: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  tableName: 'categoria', // Nome da tabela no banco de dados
})

//Categoria.sync({force: true})

module.exports = Categoria
