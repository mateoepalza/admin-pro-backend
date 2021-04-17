const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt.helpers");

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        // we search for the user using the email
        const usuarioDB = await Usuario.findOne({ email: email });
        
        // verify email
        if(!usuarioDB){
            res.status(404).json({
                ok: false,
                msg: 'email y constraseña no encontrada'
            })
        }
        
        // verify password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: "Contraseña o email no validos"
            })
        }
        
        const token =  await generarJWT( usuarioDB.id )
        
        res.json({
            ok: true,
            token: token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

module.exports = {
    login
}