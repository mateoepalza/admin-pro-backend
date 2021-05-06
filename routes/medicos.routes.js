/**
 * Medicos
 * ruta '/api/medicos/
 */
    
const Router = require('express');
const { check } = require('express-validator')
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// get doctors
router.get(
    '/', 
    getMedicos
);

// create doctor
router.post(
    '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital id debe ser validado').isMongoId(),
        validarCampos
    ],
    crearMedico
);

// update doctor
router.put(
    '/:id', 
    [],
    actualizarMedico
);

// delete doctor
router.delete(
    '/:id', 
    eliminarMedico
);


module.exports = router;