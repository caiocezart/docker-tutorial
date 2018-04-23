const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

var Nome = mongoose.model('Nome', {
  id: Number,
  nome: String
});

router.get('/', function (req, res) {

  // pegar todos os nomes do banco
  Nome.find(function (err, nomes) {

    // se acontecer algum erro, retorne o mesmo
    if (err)
      res.send(err)

    // retornar todos os nomes encontrados em formato json
    res.json(nomes);
  });
});

router.post('/', function (req, res) {

  // criar um nome no banco com as informações vindo da aplicação angular
  console.log(req.body)

  Nome.create({
    nome: req.body.nome
  }, function (err, nome) {
    if (err)
      res.send(err);

    // pegar todos os nomes após salvar um
    Nome.find(function (err, nomes) {
      if (err)
        res.send(err)
      res.json(nomes);
    });
  });
});

router.delete('/:nome_id', function (req, res) {
  Nome.remove({
    _id: req.params.nome_id
  }, function (err, nome) {
    if (err)
      res.send(err);

    // pegar todos os nomes após deletar um
    Nome.find(function (err, nomes) {
      if (err)
        res.send(err)
      res.json(nomes);
    });
  });
});

module.exports = router;