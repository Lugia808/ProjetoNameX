const { sequelize, Sequelize } = require('./Database')

const Services = sequelize.define('Services', {
  nomedoServico: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  contratante: {
    type: Sequelize.STRING,
    allowNull: false
  },
  valor:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'services', // Nome da tabela no banco de dados
})

//Services.sync({force: true})

module.exports = Services
