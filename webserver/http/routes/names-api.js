const express = require('express');
const router = express.Router();
const axios = require('axios');

const api_url = 'http://api:3000/api/names';
const defaultTableName = 'names';

async function getNames() {
    return axios.get(api_url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
}

router.get('/', async function (req, res) {
    const names = await getNames();
    res.json(names);
});

router.post('/', async function (req, res) {
    const newName = {
        TableName: defaultTableName,
        Item: {
            name: req.body.name
        }
    };

    axios.post(api_url, newName)
        .then(async function (response) {
            console.log(response);
            const names = await getNames();
            res.json(names);
        })
        .catch(function (error) {
            res.sendStatus(500);
        });
});

router.delete('/:name', async function (req, res) {
    const params = {
        name: req.params.name
    }

    axios.delete(api_url + '/' + req.params.name)
        .then(async function (response) {
            const names = await getNames();
            res.json(names);
        })
        .catch(function (err){
            res.sendStatus(500);
        })
});

module.exports = router;