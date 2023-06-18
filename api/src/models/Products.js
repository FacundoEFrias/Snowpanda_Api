const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("products", {
    productsID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    img: {
      type: DataTypes.STRING,
    },
    featuredProduct: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    material: {
      type: DataTypes.STRING,
    },
    activity: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.JSON,
    },
    model: {
      type: DataTypes.STRING,
    },
    numbersizes: {
      type: DataTypes.JSON,
    },
    sizes: {
      type: DataTypes.JSON,
    },
    boardsizes: {
      type: DataTypes.JSON,
    },
  });
};

// NumberSize(talle 30,32,34)
// Size (talle S,M,L)
// BoardSize( para poder manejar el stock todos igual)
