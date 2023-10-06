const { sequelize, Sequelize } = require('./Database')

const UserEMP = sequelize.define('User', {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    perfil_img: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    codigo: {
        type: Sequelize.STRING,

    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

}, {
    tableName: 'users', // Nome da tabela no banco de dados
})

//User.sync({force: true})

module.exports = UserEMP
