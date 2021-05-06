const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const getTodo = async (req, res) => {

    // Get the param busqueda
    const busqueda = req.params.busqueda;
    /**
     * let's say that we have as busqueda "Hola pinches"
     * the regex constant would be "/hola pinches/i"
     */
    const regex = new RegExp(busqueda, 'i');

    try {
        /**
        // Here we are doing LIKE search on the users's name
        const usuarios = await Usuario.find({
            nombre: regex
        });

        // Here we are doing a LIKE search on the doctor's name
        const medicos = await Medico.find({
            nombre: regex
        });

        //
        const hospitales = await Hospital.find({
            nombre: regex
        })
        */

        /**
         * The following implementation does the same thing as the previous implementation
         * 
         * * Promise.all() -> devuelve una promesa que termina correctamente cuando todas las
         *                    promesas en el argumento iterable han sido concluidas con éxito,
         *                    , o bien rechaza la petición con el motivo pasado por la primera
         *                    promesa que es rechazada
         * 
         * * Return -> devuelve una promesa que se cumplirá cuando todas las promesas del argumento
         *             hayan sido cumplidas, o bien se rechazarán cuando alguna de ellas se rechace
         */
        const [ usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex }),
        ])

        return res.json({
            ok: true,
            usuarios: usuarios,
            medicos: medicos,
            hospitales: hospitales
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}


const getDocumentosColeccion = async (req, res) => {

    // Get the name of the collection
    const tabla = req.params.tabla;
    // Get the parameter that we are seaching
    const busqueda = req.params.busqueda;
    
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    try {

        switch (tabla) {
            case "medicos":
                /**
                 * We are doing a Select .. WHERE field LIKE "something",
                 * and we are populating the documents that are related to this collection,
                 * in this case we are talking about "usuario" and "hospital"
                 */
                data = await Medico.find({
                    nombre: regex
                })
                .populate('usuario', {
                    nombre: 1,
                    img: 1
                })
                .populate('hospital',{
                    nombre: 1,
                    img: 1
                });
                break;
                /**
                 * We are doing a Select ... Where field LIKE "something",
                 * and we are populating the result with the usuario data that is related
                 * with this collection
                 */
            case "hospitales":
                data = await Hospital.find({
                    nombre: regex
                })
                .populate('usuario', {
                    nombre: 1,
                    img: 1
                })
                break;
            case "usuarios":
                data = await Usuario.find({
                    nombre: regex
                })
                break;
        
            default:
                res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios, medicos, hospitales'
                })
                break;
        }

        res.json({
            ok: true,
            data: data
        })
        

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        })
    }
}


module.exports = {
    getTodo,
    getDocumentosColeccion
}