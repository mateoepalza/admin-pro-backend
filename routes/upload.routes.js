const { Router } = require('express');
const expressFileUpload  = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornarImagen } = require('../controllers/uploads.controller');

const router = Router();

// define the express file upload as a middleware
router.use(expressFileUpload())

router.put(
    '/:tipo/:id',
    [validarJWT],
    fileUpload
);

router.get(
    '/:tipo/:foto',
    retornarImagen
)


module.exports = router;