// webserver
const express = require('express');

// ajudar a permitir acesso de outros servidores
const cors = require('cors')

// acesso ao banco - mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nomes'); 

// caminhos para as rotas da api
const nomesAPI = require('./routes/nomes-api');

// configurar a localização dos caminhos
const path = require('path');

// extrair informação do POST
const bodyParser = require('body-parser');

// criar o aplicativo
const app = express();

// iniciar configuração que permite acesso de outros servidores
app.use(cors({origin: '*', methods: ['GET', 'OPTIONS', 'POST', 'DELETE']}))

// configurar arquivos estáticos para /dist
app.use(express.static(path.join(__dirname, 'dist')));

// aceitar application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
// aceitar application/json
app.use(bodyParser.json());
// aceitar application/vnd.api+json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// carregar as rotas do arquivo externo
app.use('/api/nomes', nomesAPI)

// chamada para o frontend
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// iniciar o aplicativo na porta 8080
const porta = process.env.PORTA || 8080;

app.listen(porta);
console.log(`Aplicativo ouvindo na porta ${porta}..`);

