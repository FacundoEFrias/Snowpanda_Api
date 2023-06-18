const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "reviews",
    {
      idReviews: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName:{
        type: DataTypes.STRING,
        allowNull:false
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [5, 1000]   // esto es una validacion de cantidad de caracteres.. de 5 a 1000.. sino falla el posteo
      }},

      productName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
  
      rating: {
        type: DataTypes.REAL,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            }
      },
      hidden: {  //esto es un status.. si esta en false esta visible... si esta en false esta oculto
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
    },
    // {
    //   timestamps: false,
    // }
  );
};
