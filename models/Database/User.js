const { sequelize, Sequelize } = require('./Database')

const User = sequelize.define('User', {
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
  tipo:{
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'users', // Nome da tabela no banco de dados
})

//User.sync({force: true})
// ,
//   CEP:{
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   Endereço //Colocar numero da casa
//   :{
    
//   }


module.exports = User
