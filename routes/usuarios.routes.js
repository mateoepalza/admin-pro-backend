/**
 * Ruta: '/api/usuarios'
 */

// import the router
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// get the instance
const router = Router();

//import the controller
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios.controllers');
const { validarJWT } = require('../middlewares/validar-jwt');


// get all users
router.get(
    '/', 
    validarJWT, 
    getUsuarios
);

// create user
router.post(
    '/',
    [
        /**
         * Cuando de pasa por los siguientes middlewares se va a crear en el request (req) un arreglo
         * de errores con lo que no sucedio (Los errores que hubieron)
         */
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligaorio').not().isEmpty(),

        // This is a custom middleware, keep in mind that we have to define this middleware in the end
        // of the checks, because it will work with the "errors" object created after checking the fields
        validarCampos
    ],
    crearUsuario
);

// update user
router.put(
    '/:id',
    [
        /**
         * Cuando de pasa por los siguientes middlewares se va a crear en el request (req) un arreglo
         * de errores con lo que no sucedio (Los errores que hubieron)
         */
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatoria').not().isEmpty(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
);


// delete user
router.delete(
    '/:id',
    validarJWT,
    borrarUsuario
)



module.exports = router;