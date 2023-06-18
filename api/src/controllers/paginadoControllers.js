const { Products} = require("../db");
const { Op } = require("sequelize");

const getPaginado = async (req, res) => {
    try {
      const { page, pageSize } = req.query;
      const limit = parseInt(pageSize, 10) || 10;
      const offset = (parseInt(page, 10) - 1) * limit || 0;
  
      const products = await Products.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });
  
      res.status(200).json({
        totalPages: Math.ceil(products.count / limit),
        currentPage: parseInt(page, 10) || 1,
        products: products.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
 
  // http://localhost:3001/paginado?pageSize=1&page=20
  module.exports = {
    getPaginado}