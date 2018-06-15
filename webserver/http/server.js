const express = require('express');
const cors = require('cors');

const namesAPI = require('./routes/names-api');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({origin: '*', methods: ['GET', 'OPTIONS', 'POST', 'DELETE']}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use('/api/names', namesAPI);

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = 8080;

app.listen(port);
console.log(`Listening on port ${port}..`);