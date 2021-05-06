/**
 * '/api/hospitales'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { getHospitales, crearHospital, actualizaHospital, borrarHospital } = require('../controllers/hospitales.controller');

const router = Router();

router.get(
    '/',
    getHospitales
)

router.post(
    '/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es requerido').not().isEmpty(),
        validarCampos
    ],
    crearHospital
)

router.put(
    '/:id',
    [],
    actualizaHospital
)

router.delete(
    '/:id',
    borrarHospital
)

module.exports = router;