const path = require('path');
const fs = require('fs');

const { v4: uuid4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen')

const fileUpload = (req, res) =>{
    try {
        
        // get the parameters /:tipo/:id
        const type = req.params.tipo;
        const id = req.params.id;
        
        const validTypes = ['hospitales', 'medicos', 'usuarios'];
        // check the valid types
        if(!validTypes.includes(type)){
            res.status(400).json({
                ok: false,
                msg: 'El tipo enviado no es médico, usuario u hospital'
            });
        }
        

        // check if there is a file
        if( !req.files || Object.keys(req.files).length == 0){
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun archivo'
            })
        }

        
        // process the image
        const file = req.files.imagen;

        const nombreCortado = file.name.split('.'); // the name goes like file_1.png
        // this takes the extension
        const extensionArchivo = nombreCortado[ nombreCortado.length -1 ]

        // validate extension
        const extensionesValidas = ["png", "jpg", "jpeg", "gif"]
        if(!extensionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok: false,
                msg: "No es una extensión permitida"
            });
        }
        
        // Generar el nombre del archivo
        const nombreArchivo = `${ uuid4() }.${ extensionArchivo }`;
        
        // save image in path
        const path = `./uploads/${ type }/${ nombreArchivo }`;
        
        // move the file to another position
        file.mv( path, (err) => {
            // check if there was an error
            if(err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: "There was an error trying to move the image"
                });
            }

            // actualizar base de datos
            actualizarImagen(type, id, nombreArchivo);
            
            res.json({
                ok: true,
                msg: "Archivo subido",
                nombreArchivo: nombreArchivo
            })
        })
        

    } catch (e) {
       console.log(e);
       res.status(500).json({
           ok: false,
           msg: 'There was an error trying to upload the image'
       }) 
    }
}

const retornarImagen = (req, res) => {
    try {
        
        // get /:tipo/:foto parameters
        const type = req.params.tipo;
        const foto = req.params.foto;

        // get the current directoy and join the path to the image
        const pathImage = path.join(__dirname, `../uploads/${ type }/${ foto }`);
        
        // default image
        // existsSync() check if a file is already exists in the given path or not
        if(fs.existsSync(pathImage)){
            // the path must be an absolute path to the file
            res.sendFile(pathImage);
        }else{
            // the path must be an absolute path to the file
            const pathImage = path.join(__dirname, `./uploads/no-img.png`); 
            res.sendFile(pathImage);
        }
    } catch (e) {
       console.log(e);
       res.status(500).json({
          ok: false,
          msg: 'There was an error displaying the image' 
       }) 
    }
}


module.exports = {
    fileUpload,
    retornarImagen
}