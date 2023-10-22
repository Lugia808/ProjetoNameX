const { sequelize, Sequelize } = require('./Database')

const Candidato = sequelize.define('Candidato', {
  id_candidato: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  id_servico:{
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
}, {
  tableName: 'candidato', // Nome da tabela no banco de dados
})

//Candidato.sync({force: true})

module.exports = Candidato
