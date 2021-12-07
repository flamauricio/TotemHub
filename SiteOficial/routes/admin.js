var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Gerente = require('../models').Gerente;

let sessoes = [];

/* Cadastrar gerente */
router.post('/cadastrar/', function(req, res, next) {
	console.log('Criando um gerente');

	Gerente.create({
		nome_gerente : req.body.nome,
		login_gerente : req.body.email,
		fk_estacao: req.body.estacao,
		senha_gerente: req.body.senha,
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

router.get('/exibir/', function (req, res, next) {
	console.log('Recuperando todas os gerentes');

	let instrucaoSql = `SELECT * FROM gerente;`;

	sequelize.query(instrucaoSql, {
		model: Gerente,
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

router.post('/update/', function (req, res, next) {
	console.log('atualizando email e senha do gerente');

	var id_gerente = req.body.id;
	var login_gerente = req.body.email;
	var senha_gerente = req.body.senha;

	let instrucaoSql = `UPDATE gerente SET login_gerente = '${login_gerente}', senha_gerente = '${senha_gerente}' where id_gerente = ${id_gerente};`;

	sequelize.query(instrucaoSql, {
		model: Gerente,
		mapToModel: true
	})
		.then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado[0]);
		})
		.catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});

router.post('/deletar/', function (req, res, next) {
	console.log('deletando um gerente');

	var idGerente = req.body.delete;

	let instrucaoSql = `DELETE FROM gerente WHERE id_gerente = ${idGerente};`;

	sequelize.query(instrucaoSql, {
		model: Gerente,
		mapToModel: true
	})
		.then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado[0]);
		})
		.catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});

router.get('/sessao/:login', function (req, res, next) {
	let login_gerente = req.params.login_gerente;
	console.log("agente:", login_gerente);
	console.log(`Verificando se o usuário ${login_gerente} tem sessão`);

	let tem_sessao = false;
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] == login_gerente) {
			tem_sessao = true;
			res.status(500).send(erro.message);
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login_gerente} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
});

module.exports = router;