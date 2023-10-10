const { sequelize, Sequelize } = require('./Database')

const UserEMP = sequelize.define('UserEMP', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CNPJ: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    tam_empresa: {
        type:Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,
    }

}, {
    tableName: 'userEmp', // Nome da tabela no banco de dados
})

//UserEMP.sync({force: true})

module.exports = UserEMP
