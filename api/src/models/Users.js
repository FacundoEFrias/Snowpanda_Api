const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("users", {
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    nationality:{
      type: DataTypes.STRING,
  },
  date_birth : {
    type: DataTypes.DATEONLY,
},
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("active", "disabled"),
      defaultValue: "active",
    },
    privilige: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Al crearte como usuario por defecto el privilegio es FALSE
    },
    user_password: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING, // Se cargó DataTypes.JSON porque podemos diferenciar el domicilio del código postal, y demás información. (Piso, Departamento)
    },
  });
};
