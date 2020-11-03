const express = require('express')
const { dbConnection } = require('./Database/config');


require('dotenv').config();

//const express = require('express')
const cors = require('cors')


//servidor express
const app = express();

//Configure CORS
app.use(cors())


//Lectura y parseo del body
app.use(express.json())

//Base de datos
dbConnection();

/* //rutas
app.get('/',(req, resp)=>{
    resp.status(202).json({
        ok: true,
        msg: 'Hi!'
    })
}); */

app.use('/api/usuarios', require('./rutas/rutas_usuarios'))

app.listen(process.env.PORT, ()=>{
console.log('Servidor corriendo'+ process.env.PORT);

});