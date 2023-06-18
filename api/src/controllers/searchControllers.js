const { Products} = require("../db");
const { Op } = require("sequelize");

 const searchProducts = async (req, res) => {
    
try {
  let {name}  = req.query;
  
  const productsName = await Products.findAll({});
  if (name){
    let products = await productsName.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    // products.length ? 
    res.status(200).json(products) 
    // :
    // res.status(404).json("The product does not exist");
  
}}

catch (error) {
  console.error(error);
  res.status(404).json({ message: "Internal Server Error" });
}
};

  module.exports = {searchProducts}
