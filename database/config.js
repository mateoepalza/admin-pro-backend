const mongoose = require('mongoose')


const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('db online');
    } catch (e) {
        console.log(e);
        // we throw an error because the connection failed and we don't want the app to work if the
        // database is not working
        throw new Error('Error a la hora de iniciar la BD')
    }

}

module.exports = {
    // in here i am exporting the function defined previously
    dbConnection
}