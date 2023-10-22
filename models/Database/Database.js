const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('usersPJ', 'admin', '12345678', {
    host: process.env.DATABASE_CODE,
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
  