const { Schema, model } = require('mongoose');

// Definicion de cada uno de los registros quevan a estar dentro de una colección
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: "USER_ROLE"
    },
    google: {
        type: Boolean,
        default: false
    }
})

// function hace referencia al objeto. funcion de flecha a lo que está afuera del objeto
UsuarioSchema.method('toJSON', function(){
    // In here we are taking out the __v, _id and password from the object
    const {__v, _id, password, ...object} = this.toObject();
    
    // We change the _id to uid
    object.uid = _id;

    return object
})

// export the module - we export the Usuario model - Mongoose le agrega
module.exports = model( 'Usuario', UsuarioSchema);