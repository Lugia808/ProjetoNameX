const Candidato = require('./Candidato');
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
  },
  Candidato:{
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'services', // Nome da tabela no banco de dados
})

// Services.hasMany(Candidato, { foreignKey: 'id' });
//Services.sync({force: true})

module.exports = Services
