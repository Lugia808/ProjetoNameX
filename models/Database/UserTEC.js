const { sequelize, Sequelize } = require('./Database')

const UserTEC = sequelize.define('UserTEC', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    num_registro: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,
    }

}, {
    tableName: 'userTec', // Nome da tabela no banco de dados
})

//User.sync({force: true})

module.exports = UserTEC
