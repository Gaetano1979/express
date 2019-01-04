const express = require('express');
const app = express();

//declaramos el parser 
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// creamos el cors para el sito de heroku
app.use(cors());

//creamos el vinculo con la rutas globlales
app.use(require('./rouetrs/index'));

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto: ${port}`);
});