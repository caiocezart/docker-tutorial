// webserver
var express = require('express');                           

// configurar a localização dos caminhos
const path = require('path');

// extrair informação do POST
var bodyParser = require('body-parser');

// criar o aplicativo
var app = express();   

// configurar arquivos estáticos para /dist
app.use(express.static(path.join(__dirname, 'dist')));

// chamada para o frontend
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// iniciar o aplicativo na porta 8080
app.listen(8080);
console.log("Aplicativo ouvindo na porta 8080..");