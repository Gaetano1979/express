const express = require('express');
const app = express();
const port = process.env.PORT || 3000;




app.get('/', (req, res) => {
    // res.send('Hello Word');
    res.json({
        ok: true,
        mensaje: 'todo bien en Heroku'
    });
    console.log('todo bien');

});
app.get('/clientes', (req, res) => {
    res.send('Bienvenidos a clientes');
});

app.listen(port, () => {
    console.log('Servidor corriendo');

});