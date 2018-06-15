const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const defaultTableName = 'names';

async function getNames() {
    return await docClient.scan({ TableName: defaultTableName }, function (err, data) {
        if (err) { res.send(err); }
        return data;
    }).promise();
}

router.get('/', async function (req, res) {
    const names = await getNames();
    res.json(names);
});

router.post('/', async function (req, res) {
    docClient.put(req.body, async function (err) {
        if (err) { res.send(err); }
        res.sendStatus(200);
    });
});

router.delete('/:name', async function (req, res) {
    const itemToDelete = {
        TableName: defaultTableName,
        Key: {
            name: req.params.name
        }
    };

    docClient.delete(itemToDelete, async function (err) {
        if (err) { res.send(err); }

        const names = await getNames();
        res.json(names);
    });
});

module.exports = router;