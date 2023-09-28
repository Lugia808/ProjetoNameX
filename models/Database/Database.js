const Sequelize = require('sequelize');

const sequelize = new Sequelize('usersPJ', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Connection with database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  

  module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
  }
  