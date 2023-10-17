const { sequelize, Sequelize } = require('./Database');
const Categoria = require('./Categoria'); // Importe o modelo da Categoria

const ServiceTypes = sequelize.define('Services', {
  nomedoServico: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  basePreco: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // Adicione a chave estrangeira para a tabela Categoria
  categoriaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'id', // Chave primária da tabela Categoria
    },
  },
}, {
  tableName: 'servicesTypes',
});

//ServiceTypes.sync({force: true})

// Defina a relação entre Services e Categoria
ServiceTypes.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });



module.exports = ServiceTypes;
