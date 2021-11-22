var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Feedback = require('../models').Feedback;


/* Cadastrar leads */
router.post('/cadastrar_feedback', function(req, res, next) {
    console.log("cadastrando uma feedback");

    Feedback.create({
        pontuacao: req.body.pontuacao,
        mensagem: req.body.mensagem,
        fk_estacao: id_estacao
    }).then(resultado => {
        console.log(`Mensagem criada: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    })
})


router.get('/:fk_estacao', function(req, res, next) {
    console.log('Recuperando todas os feedbacks');

    var fk_estacao = req.params.fk_estacao;

    let instrucaoSql = `SELECT * from Feedback where ${fk_estacao}`;

    sequelize.query(instrucaoSql, {
            model: Feedback,
            mapToModel: true
        })
        .then(resultado => {
            console.log(`Encontrados: ${resultado.length}`);
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

module.exports = router;