const { DataTypes } = require("sequelize");
const Users = require("./Users");


module.exports = (sequelize) => {
  sequelize.define(
    "favorites",
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            //references: {
            //  model: Users,
            //  key: 'id'
            //}
          },
          productId: {
            type: DataTypes.INTEGER,
            allowNull: false
          }}
  );
};