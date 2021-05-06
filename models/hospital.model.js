const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        // here we are telling mongoose that we will have a relationship between this schema and Usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    /**
     * Below we specify the name of the collection that we want
     */
}, { collection: 'hospitales'});

// this element defines what is going to be retrieve once we do an update or an insert into the collection
HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
})


module.exports = model( 'Hospital', HospitalSchema);