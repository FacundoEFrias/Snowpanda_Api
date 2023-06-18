
const { Router } = require("express");
const {getAllUsers,postNewUser, DisableUser, ModifyUser, searchUsuario,disableEstatus,privilegeEstatus, updateAddress } = require('../controllers/usersControllers')

const router = Router();

//!! GET /users

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', getAllUsers);

//!! SEARCH USERS

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener usuario por email
 *     description: Obtiene información de un usuario por su dirección de correo electrónico.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Dirección de correo electrónico del usuario.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del usuario obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/:email", searchUsuario)

//!! POST /users

/**
 * @swagger
 * /users/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               given_name:
 *                 type: string
 *               family_name:
 *                 type: string
 *               email:
 *                 type: string
 *               picture:
 *                 type: string
 *             example:
 *               given_name: John
 *               family_name: Doe
 *               email: johndoe@example.com
 *               picture: https://example.com/profile.jpg
 *     responses:
 *       200:
 *         description: Usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       201:
 *         description: Usuario creado exitosamente y correo electrónico enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User was created and email was sent
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/create', postNewUser)

//!! PUT users/disable/{idUser}

/**
 * @swagger
 * /users/disable/{idUser}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Desactivar o activar un usuario
 *     description: Desactiva o activa un usuario según su estado actual.
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: ID del usuario a desactivar o activar.
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Estado del usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Error de autorización.
 */
router.put("/disable/:idUser", DisableUser)

//!! PUT users/modify/{email}

/**
 * @swagger
 * /users/modify/{email}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Modificar un usuario
 *     description: Modifica la información de un usuario según su dirección de correo electrónico.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Dirección de correo electrónico del usuario a modificar.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: first_name
 *         required: false
 *         description: Nuevo nombre del usuario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: last_name
 *         required: false
 *         description: Nuevo apellido del usuario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: nationality
 *         required: false
 *         description: Nueva nacionalidad del usuario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: date_birth
 *         required: false
 *         description: Nueva fecha de nacimiento del usuario.
 *         schema:
 *           type: string
 *           format: date
 *       - in: formData
 *         name: mobile
 *         required: false
 *         description: Nuevo número de teléfono móvil del usuario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: address
 *         required: false
 *         description: Nueva dirección del usuario.
 *         schema:
 *           type: string
 *       - in: formData
 *         name: image
 *         required: false
 *         description: Nueva imagen del usuario.
 *         schema:
 *           type: string
 *           format: binary
 *     responses:
 *       201:
 *         description: Usuario modificado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Error de autorización.
 */
router.put("/modify/:email", ModifyUser)



//router.put("/disable/:idUser'", disableEstatus)


//!! PUT /users/privilege/{idUser}

/**
 * @swagger
 * /users/privilege/{idUser}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Cambiar el estado de privilegio de un usuario
 *     description: Cambia el estado de privilegio de un usuario según su identificador.
 *     parameters:
 *       - in: path
 *         name: idUser
 *         required: true
 *         description: Identificador del usuario.
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Estado de privilegio del usuario cambiado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Error de autorización.
 */
router.put('/privilege/:idUser', privilegeEstatus)

//!! PUT users/address/{email}

/**
 * @swagger
 * /users/address/{email}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar dirección de un usuario
 *     description: Actualiza la dirección de un usuario según su dirección de correo electrónico.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Dirección de correo electrónico del usuario.
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: Objeto con la nueva dirección del usuario.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             address:
 *               type: string
 *     responses:
 *       201:
 *         description: Dirección de usuario actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Error de autorización.
 */
router.put("/address/:email",updateAddress)


 

module.exports = router;