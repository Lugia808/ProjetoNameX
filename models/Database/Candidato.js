const { sequelize, Sequelize } = require('./Database')

const Candidato = sequelize.define('Candidato', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id_candidato: {
    type: Sequelize.STRING,
    allowNull: false,

  },
}, {
  tableName: 'candidato', // Nome da tabela no banco de dados
})

//Candidato.sync({force: true})

module.exports = Candidato
