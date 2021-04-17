const jwt = require('jsonwebtoken')

const generarJWT = (uid) => {

    // we return a promise because we want to use async/await in the place when we want to use this function
    return new Promise((resolve, reject) => {
        const payload = {
            uid: uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            }else{
                resolve(token)
            }


        })

    })
}

module.exports = {
    generarJWT
}