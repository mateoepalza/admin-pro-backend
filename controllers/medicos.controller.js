
const Medico = require('../models/medico.model');

const getMedicos = async (req, res) => {

    try {
        // populate allows us to "join" collections
        const medicos = await Medico.find()
                // search for the name and project the name and image
                .populate('usuario', { 
                    nombre: 1, 
                    img: 1 
                })
                // search for the user and project the name and image
                .populate('hospital', {
                    nombre: 1,
                    img: 1
                });
        
        
        return res.json({
            ok: true,
            medicos: medicos
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: true,
            msg: "Hable con el administrador"
        });
    }


}

const crearMedico = async (req, res) => {

    // Get the uid of the person who created the doctor
    const uid = req.uid;

    // Create a doctor
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        // Save the doctor
        const medicoBD = await medico.save();

        res.json({
            ok: true,
            medico: medicoBD
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedico = (req, res) => {
    return res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const eliminarMedico = (req, res) => {
    return res.json({
        ok: true,
        msg: 'eliminarMedico'
    })
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}