const { sequelize, Sequelize } = require('./Database')

const Services = sequelize.define('Services', {
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
  contratante: {
    type: Sequelize.STRING,
    allowNull: false
  },
  valor:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  situacao:{
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'services', // Nome da tabela no banco de dados
})

//Services.sync({force: true})

module.exports = Services
