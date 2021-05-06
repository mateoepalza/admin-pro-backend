const fs = require('fs');

const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model');


const borrarImagen = (path) => {
    // check if the file exists
    if (fs.existsSync(path)) {
        // delete the previous image
        fs.unlinkSync(path)
    }
}


const actualizarImagen = async (type, id, fileName) => {

    oldPath = "";

    try {
        switch (type) {
            case 'medicos':
                const medico = await Medico.findById(id);

                if (!medico) {
                    console.log("No es n médico por id");
                    return false;
                }

                // Delete previous image
                oldPath = `./uploads/medicos/${medico.img}`;
                borrarImagen(oldPath);

                // Update obj with the new image
                medico.img = `./uploads/medicos/${fileName}`;
                await medico.save();
                return true;

                break;
            case 'hospitales':

                const hospital = await Hospital.findById(id);

                if (!hospital) {
                    console.log("No es un hospital por id");
                    return false;
                }

                // delete previous image
                oldPath = `./uploads/hospitales/${hospital.img}`;
                borrarImagen(oldPath);

                // Update obj with the new image
                hospital.img = `./uploads/hospitales/${fileName}`;
                hospital.save();
                return true;
                break;

            case 'usuarios':

                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    console.log("No es un usuario por id");
                    return false;
                }

                // Delete old image
                oldPath = `./uploads/usuarios/${usuario.img}`;
                borrarImagen(oldPath);

                // Update obj with the new image
                usuario.img = `./uploads/usuarios/${fileName}`;
                usuario.save();
                return true;

                break;

            default:
                break;
        }
    } catch (e) {
        console.log(e);
        return false;
    }


}


module.exports = {
    borrarImagen,
    actualizarImagen
}