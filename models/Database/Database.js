const Sequelize = require('sequelize');

const sequelize = new Sequelize('usersPJ', 'admin', '12345678', {
    host: 'awseb-e-jejqei32qw-stack-awsebrdsdatabase-9abmmhtmst8f.cy7zjpr3eyfg.us-east-1.rds.amazonaws.com',
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
  