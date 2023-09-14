const {Router} = require('express');
const {searchProducts}= require("../controllers/searchControllers")
const router = Router();


/**
 * @swagger
 * /search:
 *   get:
 *     tags:
 *       - Products
 *     summary: Buscar productos
 *     description: Busca productos por nombre.
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Nombre del producto a buscar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: El producto no existe.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', searchProducts)

module.exports = router;
