const {Router} = require('express');
const {getAllReviews,postReviews,getReviewsById,disableReviews,} = require('../controllers/reviewsControllers');

const router = Router();

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Obtener todas las reseñas
 *     description: Obtiene una lista de todas las reseñas.
 *     responses:
 *       200:
 *         description: Lista de reseñas obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: No se encontraron reseñas.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', getAllReviews)

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Obtener reseña por ID
 *     description: Obtiene la información de una reseña por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reseña.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información de la reseña obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: La reseña no fue encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', getReviewsById)


/**
 * @swagger
 * /reviews/disable/:idReviews:
 *   put:
 *     tags:
 *       - Reviews
 *     summary: Desactivar o activar reseña
 *     description: Desactiva o activa una reseña especificada por su ID.
 *     parameters:
 *       - in: path
 *         name: idReviews
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la reseña a desactivar o activar.
 *     responses:
 *       201:
 *         description: La reseña fue desactivada o activada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Error de autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Descripción del error.
 */
router.put('/disable/:idReviews', disableReviews)

/**
 * @swagger
 * /reviews/create:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Crear reseña
 *     description: Crea una nueva reseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: Comentario de la reseña.
 *               rating:
 *                 type: number
 *                 description: Calificación de la reseña.
 *               firstName:
 *                 type: string
 *                 description: Nombre del usuario que realiza la reseña.
 *               productName:
 *                 type: string
 *                 description: Nombre del producto que se está reseñando.
 *               idUser:
 *                 type: integer
 *                 description: ID del usuario que realiza la reseña.
 *     responses:
 *       202:
 *         description: La reseña fue creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create', postReviews)


module.exports = router;