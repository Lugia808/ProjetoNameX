const { sequelize, Sequelize } = require('./Database')

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  perfil_img: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  
}, {
  tableName: 'users', // Nome da tabela no banco de dados
})

//User.sync({force: true})

module.exports = User
