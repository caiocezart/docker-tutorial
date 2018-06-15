const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const namesAPI = require('./routes/names-api');
const path = require('path');

const app = express();

app.use(cors({origin: '*', methods: ['GET', 'OPTIONS', 'POST', 'DELETE']}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Load routes
app.use('/api/names', namesAPI);


app.get('/', function (req, res) {
    res.sendStatus(200);
});

const port = 3000;

app.listen(port);
console.log(`Listening on port ${port}..`);