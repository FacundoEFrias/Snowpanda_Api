const {Router} = require('express');
const {getPaginado}= require("../controllers/paginadoControllers")
const router = Router();

router.get('/', getPaginado)

module.exports = router;