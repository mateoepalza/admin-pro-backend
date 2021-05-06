const { response } = require("express");
const Hospital = require("../models/hospital.model");

const getHospitales = async (req, res = response) => {

    try {
        // get all the hospitals
        const hospitales = await Hospital.find({}).populate('usuario', {
            nombre: 1,
            img: 1
        });

        res.json({
            ok: true,
            hospitales: hospitales
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio algo inesperado"
        })
    }

}

const crearHospital = async (req, res = response) => {

    // we get the uid of the user because we already pass from the validation o the json web token
    const uid = req.uid;
    
    // we create an instance of our Hospital model, rememeber that we need the uid of the user that
    // created the hospital
    const hospital = new Hospital({
        usuario: uid,
        ...req.body // deconstruct the body
    });

    try {

        // save the hospital
        const hospitalDB = await hospital.save();

        // response
        res.json({
            ok: true,
            hospital: hospitalDB
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const actualizaHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizaHospital,
    borrarHospital
}
