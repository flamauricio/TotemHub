var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Feedback = require('../models').Feedback;

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/cadastrar/', function(req, res, next) {
    console.log("Cadastrando feedback")
    
    Feedback.create({
        pontuacao: req.body.pontuacao,
        fk_estacao: req.body.estacao,
        mensagem: req.body.mensagem
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
})

router.get('/exibir/', function (req, res, next) {
	console.log('Recuperando feedbacks');

	let instrucaoSql = `SELECT * FROM feedback;`;

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

router.get('/exibir-total/:estacao', function (req, res, next) {
	console.log('Contagem feedbacks ');

    var fk_estacao = req.params.estacao;

	let instrucaoSql = `SELECT count(pontuacao) * FROM feedback WHERE fk_estacao = ${fk_estacao};`;

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

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
    let instrucaoSql = `SELECT 
    feedback.nome,
    descricao
    FROM publicacao
    INNER JOIN Leads_Jorge
    ON Publicacao.fkUsuario = Leads_Jorge.id_leads
    ORDER BY publicacao.id DESC`;

	sequelize.query(instrucaoSql, {
		model: feedback,
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


/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/:idUsuario', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var feedback = req.params.id_feedback;

    let instrucaoSql = `SELECT 
    usuario.nome,
    descricao
    FROM publicacao
    INNER JOIN usuario
    ON Publicacao.fkUsuario = Usuario.id
    WHERE fkUsuario = ${id_feedback}
    ORDER BY publicacao.id DESC`;

	sequelize.query(instrucaoSql, {
		model: feedback,
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
