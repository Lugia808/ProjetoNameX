const { sequelize, Sequelize } = require('./Database')

const ServiceTypes = sequelize.define('Services', {
  nomedoServico: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  basePreco:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'servicesTypes', // Nome da tabela no banco de dados
})

//ServiceTypes.sync({force: true})

module.exports = ServiceTypes
