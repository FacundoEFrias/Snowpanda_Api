const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "bills",
    {
      // ID : viene del sistema
      item: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,//DECIMAL(10,2),
        allowNull: false,
      },
      shipped: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }, 
      payment_status: {
        type: DataTypes.ENUM("approved", "failed"),
        allowNull: true,
      },
      date_approved: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      id_payment: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      authorization_code: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      mp_id_order: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      fee_mp: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      image:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      product_ID:{
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      category_name:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      
    
    },
    {
      timestamps: false,
     
     
   
  }
  );
};
