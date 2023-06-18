const {Router} = require('express');
const {getAllProducts,getProductsByCategory,getProductsByBrand,getProductsById,postNewProducts,featuredProducts,deleteProducts,modifyProducts,disableProducts,controlStock} = require('../controllers/productsControllers');

const router = Router();


/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener todos los productos
 *     description: Obtiene todos los productos disponibles.
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Productos no encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 */
router.get('/', getAllProducts)

/**
 * @swagger
 * /products/category/{access}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener productos por categoría
 *     description: Obtiene todos los productos de una categoría especificada.
 *     parameters:
 *       - in: path
 *         name: access
 *         schema:
 *           type: string
 *         required: true
 *         description: Categoría de los productos a obtener.
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Productos no encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 */
router.get('/category/:access', getProductsByCategory);

/**
 * @swagger
 * /products/brand{access}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener productos por marca
 *     description: Obtiene todos los productos de una marca especificada.
 *     parameters:
 *       - in: path
 *         name: access
 *         schema:
 *           type: string
 *         required: true
 *         description: Marca de los productos a obtener.
 *     responses:
 *       200:
 *         description: Productos encontrados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No se encontraron productos o marca no válida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error.
 */

router.get('/brand/:access', getProductsByBrand);


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener producto por ID
 *     description: Obtiene un producto específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a obtener.
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msn:
 *                   type: string
 *                   description: Descripción del error.
 */
router.get('/:id', getProductsById);


/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto con los datos proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProduct'
 *     responses:
 *       200:
 *         description: Producto creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de éxito.
 *       500:
 *         description: Error al cargar la imagen a Cloudinary.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: Mensaje de error.
 */
router.post('/create', postNewProducts);


/**
 * @swagger
 * /products/disable/{productsID}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Desactivar/Activar producto
 *     description: Desactiva o activa un producto según su ID.
 *     parameters:
 *       - in: path
 *         name: productsID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a desactivar/activar.
 *     responses:
 *       201:
 *         description: Estado del producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Error al desactivar/activar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */
router.put('/disable/:productsID',disableProducts)

/**
 * @swagger
 * /products/featured/{productsID}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Establecer producto destacado
 *     description: Establece o desactiva la característica de producto destacado para un producto según su ID.
 *     parameters:
 *       - in: path
 *         name: productsID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto.
 *     responses:
 *       201:
 *         description: Producto destacado actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         description: Error al establecer el producto como destacado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */
router.put('/featured/:productsID',featuredProducts)

/**
 * @swagger
 * /products/{productsID}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Modificar producto
 *     description: Modifica un producto existente según su ID.
 *     parameters:
 *       - in: path
 *         name: productsID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto.
 *       - in: body
 *         name: body
 *         description: Datos del producto a modificar.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto modificado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error.
 *       401:
 *         description: Error al modificar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */
router.put('/modify/:productsID',modifyProducts)


/**
 * @swagger
 * /products/{productsID}/stock:
 *   put:
 *     tags:
 *       - Products
 *     summary: Control de stock
 *     description: Actualiza el stock de un producto según su ID.
 *     parameters:
 *       - in: path
 *         name: productsID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a actualizar el stock.
 *       - in: body
 *         name: body
 *         description: Objeto JSON con los datos de stock a modificar.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             sizes:
 *               type: array
 *               items:
 *                 type: string
 *               description: Array con los tamaños disponibles del producto.
 *             numbersizes:
 *               type: array
 *               items:
 *                 type: integer
 *               description: Array con la cantidad disponible para cada tamaño.
 *     responses:
 *       201:
 *         description: Stock actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sizes:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array con los tamaños actualizados del producto.
 *                 numbersizes:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: Array con la cantidad actualizada para cada tamaño.
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Mensaje de error.
 *       401:
 *         description: Error al actualizar el stock del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */
router.put('/modify/stock/:productsID',controlStock)


/**
 * @swagger
 * /products/{productsID}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Eliminar producto
 *     description: Elimina un producto según su ID.
 *     parameters:
 *       - in: path
 *         name: productsID
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a eliminar.
 *     responses:
 *       201:
 *         description: Producto eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       401:
 *         description: Error al eliminar el producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */

router.delete('/delete/:productsID', deleteProducts)



module.exports = router;