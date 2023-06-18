const { Products } = require("../db");
const { Op } = require("sequelize");

//GET FILTRADOS
//http://localhost:3001/filtrado?category=accessories&brand=SnowPandaCo&minPrice=50&maxPrice=100
const filtradoProducts = async (req, res) => {
  const {
    category,
    brandName,
    minPrice,
    maxPrice,
    orderPrice,
    size,
    numberSize,
  } = req.query;
  try {
    let product = await Products.findAll({});
    if (category) {
      product = product.filter((products) => products.category === category);
    }
    if (brandName) {
      product = product.filter(
        (products) => products.brand.brandName === brandName
      );
    }
    if (minPrice && maxPrice) {
      product = product.filter(
        (products) =>
          products.price >= Number(minPrice) &&
          products.price <= Number(maxPrice)
      );
    }
    if (orderPrice === "asc") {
      product = product.sort((a, b) => a.price - b.price);
    }
    if (orderPrice === "desc") {
      product = product.sort((a, b) => b.price - a.price);
    }
    if (size) {
      product = product.filter((products) => {
        const sizes = products.sizes;
        return sizes && sizes.find((s) => s.size === size);
      });
    }
    if (numberSize) {
      product = product.filter((products) => {
        const sizes = products.numbersizes;
        return sizes && sizes.find((s) => s.size === Number(numberSize));
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = { filtradoProducts };
