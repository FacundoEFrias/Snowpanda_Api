const { Router } = require("express");
const cors = require("cors");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllBills = require("./billsRouter");
const getAllReviews = require("./reviewsRouter");
const getAllUsers = require("./usersRouter");
const getAllProducts = require("./productsRouter");
const getAllPaginado = require("./paginadoRouter");
const getSearchProduct = require("./searchRouter");
const getFiltradoProduct = require("./filtradoRouter");
const getBills = require("./billsRouter")
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

 router.use('/bills', getAllBills);
// router.use('/reviews', getAllReviews);

router.use('/users', getAllUsers);
router.use("/products", getAllProducts);
router.use("/paginado", getAllPaginado);
router.use("/search", getSearchProduct);
router.use("/filtrado", getFiltradoProduct)
router.use("/reviews", getAllReviews)



router.get("/", (req, res, next) => {
  return res.status(200).json(getAllProducts);
});

module.exports = router;
