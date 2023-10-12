const { sequelize, Sequelize } = require('./Database')
const User = require('./User');

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
    situacao: {
        type: Sequelize.STRING
    },
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id', // Chave primária da tabela Categoria
        },
    },//Adicionar imagem de documento com foto e selfie.

}, {
    tableName: 'userTec', // Nome da tabela no banco de dados
})
UserTEC.belongsTo(User, { foreignKey: 'UserId', as: 'UserKey' });
//UserTEC.sync({force: true})

module.exports = UserTEC
