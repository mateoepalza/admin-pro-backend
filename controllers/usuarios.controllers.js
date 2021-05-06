const { response } = require('express');
const bscrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt.helpers');

const getUsuarios = async (req, res) => {

    // Get all the users
    const usuarios = await Usuario.find({}, 'nombre email role google ');

    res.json({
        ok: true,
        usuarios: usuarios,
        uid: req.uid
    })
}

const crearUsuario = async (req, res = response) => {

    // deconstruct the body
    const { email, password } = req.body;

    try {

        // search if the email exists
        const existeEmail = await Usuario.findOne({
            email: email
        });

        if (existeEmail) {
            // we return in here because we don't want the app to countine executing this method
            return res.status(400).json({
                ok: false,
                msg: "El correo ya está registrado"
            })
        }

        // we use the model that we created in mongodb
        const usuario = new Usuario(req.body);

        // Encrypt password
        // Generate random characters
        const salt = bscrypt.genSaltSync();
        // Encrypt the password using the password and the salt(random characters)
        usuario.password = bscrypt.hashSync(password, salt)

        // We save the user
        await usuario.save();
        
        // create token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario: usuario,
            token: token
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs"
        })
    }
}

// TODO: validar token y combrobar si el usuario correcto
const actualizarUsuario = async (req, res) => {
    // get the param :id
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }
        
        // Actualizaciones
        
        // get take out the password, google and email from the req.body, the rest of elements
        // will stayed in campos constant
        
        const { password, google, email, ...campos} = req.body;    

        if (usuarioDB.email != email){
            
            // we verify if the email already exists
            const existeEmail = await Usuario.findOne({ email: email});
            
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                })
            }

        }

        // we add the email again
        campos.email = email;
        
        // {new: true} tells mongoose to return the updated value
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async (req, res = response) =>{
    
    const { id } = req.params

    try{
        
        // check if the user exists
        const checkUser = await Usuario.findById( id )
        
        if(!checkUser){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        // delete user
        await Usuario.findByIdAndDelete( id );

        res.json({
            ok: true,
            uid: id
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}