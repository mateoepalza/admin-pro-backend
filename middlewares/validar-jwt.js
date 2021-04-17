const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {

    // Leer token
    const token = req.header('x-token');

    if (!token) {
        // unauthorized
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        // verify if the token exists
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        // if verify doesn't work it wil throw an exception

        // we create a parameter that is attatched to the request object, in this case the uid of the user
        req.uid = uid;

        next();

    } catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }

}


module.exports = {
    validarJWT
}