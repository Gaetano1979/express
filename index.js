var express = require('express');
var app = express();


app.get('/', (req, res) => {
    res.send('Hello Word');
    console.log('todo bien');

});
app.get('/clientes', (req, res) => {
    res.send('Bienvenidos a clientes');
})

app.listen(3500, () => {
    console.log('Servidor corriendo');

})