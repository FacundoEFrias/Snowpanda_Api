const {Router} = require('express');
const {filtradoProducts}= require("../controllers/filtradosControllers")
const router = Router();



/**
 * @swagger
 * /filtrado:
 *   get:
 *     tags:
 *       - Products
 *     summary: Filtrar productos
 *     description: Filtra productos según los criterios especificados.
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Categoría de los productos a filtrar.
 *       - in: query
 *         name: brandName
 *         schema:
 *           type: string
 *         description: Nombre de la marca de los productos a filtrar.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Precio mínimo de los productos a filtrar.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Precio máximo de los productos a filtrar.
 *       - in: query
 *         name: orderPrice
 *         schema:
 *           type: string
 *         description: >
 *           Ordenar los productos por precio. Valores posibles: "asc" (ascendente) o "desc" (descendente).
 *       - in: query
 *         name: size
 *         schema:
 *           type: string
 *         description: Tamaño de los productos a filtrar.
 *       - in: query
 *         name: numberSize
 *         schema:
 *           type: number
 *         description: Cantidad de productos disponibles para un tamaño específico.
 *     responses:
 *       '200':
 *         description: Productos filtrados obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Error al filtrar los productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 */
router.get('/', filtradoProducts)

module.exports = router;
