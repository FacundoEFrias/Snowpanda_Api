const { Router } = require("express");
const {
  postNewBills,
  getAllBills,
  paymentNotification,
  desactivaBill, 
  searchBills
} = require("../controllers/billsControllers");

const router = Router();


/**
 * @swagger
 * /bills:
 *   get:
 *     tags:
 *       - Bills
 *     summary: Obtener todas las facturas
 *     description: Obtiene todas las facturas registradas en el sistema.
 *     responses:
 *       200:
 *         description: Facturas obtenidas exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bills'
 *       404:
 *         description: No se encontraron facturas.
 */
router.get("/", getAllBills);

/**
 * @swagger
 * /bills/payment:
 *   post:
 *     tags:
 *       - Bills
 *     summary: Realizar pago
 *     description: Realiza el pago de una factura utilizando Mercado Pago.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Item'
 *               payer:
 *                 $ref: '#/components/schemas/Payer'
 *               back_urls:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: string
 *                     description: "URL de redirección en caso de éxito."
 *                   failure:
 *                     type: string
 *                     description: "URL de redirección en caso de fallo."
 *                   pending:
 *                     type: string
 *                     description: "URL de redirección en caso de pago pendiente."
 *               auto_return:
 *                 type: string
 *                 description: "Comportamiento de redirección automática. Valores posibles: 'approved' (aprobado) o 'all' (todos)."
 *               binary_mode:
 *                 type: boolean
 *                 description: "Modo binario. Si se establece en 'true', se utilizará el modo binario."
 *               notification_url:
 *                 type: string
 *                 description: "URL de notificación para recibir actualizaciones de estado de pago."
 *     responses:
 *       '201':
 *         description: "URL de pago generado exitosamente."
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               description: "URL de pago."
 *       '500':
 *         description: "Error al generar la URL de pago."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: "Detalles del error."
 */

router.post("/create", postNewBills);

/**
 * @swagger
 * /bills/payment/notification:
 *   get:
 *     tags:
 *       - Bills
 *     summary: Notificación de pago
 *     description: Recibe notificaciones de estado de pago de Mercado Pago.
 *     parameters:
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         description: Tipo de notificación (opcional). Valores posibles: "payment" (pago).
 *     responses:
 *       200:
 *         description: Notificación recibida exitosamente.
 *       default:
 *         description: Error al recibir la notificación.
 */
router.post("/payment/notification", paymentNotification);

/**
 * @swagger
 * /bills/{id}/status:
 *   patch:
 *     tags:
 *       - Bills
 *     summary: Cambiar estado de factura
 *     description: Cambia el estado (activo/inactivo) de una factura.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura a modificar.
 *     responses:
 *       204:
 *         description: Estado de la factura cambiado exitosamente.
 *       404:
 *         description: No se encontró la factura especificada.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/:id', desactivaBill)


/**
 * @swagger
 * /bills/search:
 *   get:
 *     tags:
 *       - Bills
 *     summary: Buscar facturas
 *     description: Busca facturas por correo electrónico, estado o ID de pago.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Correo electrónico para filtrar las facturas.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Estado de la factura para filtrar las facturas.
 *       - in: query
 *         name: id_payment
 *         schema:
 *           type: string
 *         description: ID de pago para filtrar las facturas.
 *     responses:
 *       200:
 *         description: Lista de facturas encontradas.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/search', searchBills)

module.exports = router;
