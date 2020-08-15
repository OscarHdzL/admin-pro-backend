const express = require('express')
const { dbConnection } = require('./Database/config');


require('dotenv').config();

//const express = require('express')
const cors = require('cors')


//servidor express
const app = express();

//Configure CORS
app.use(cors())


//Base de datos
dbConnection();

//rutas
app.get('/',(req, resp)=>{
    resp.status(202).json({
        ok: true,
        msg: 'Hi!'
    })
});

app.listen(process.env.PORT, ()=>{
console.log('Servidor corriendo'+ process.env.PORT);

});