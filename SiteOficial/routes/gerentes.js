var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Gerente = require('../models').Gerente;
var Usuario = require('../models').Usuario;

let sessoes = [];

router.post('/autenticar', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var email_gerente = req.body.login_gerente; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha_gerente = req.body.senha_gerente; // depois de .body, use o nome (name) do campo em seu formulário de login	

	let instrucaoSqlGerente = `select * from gerente 
							where login_gerente= '${email_gerente}'
							and senha_gerente= '${senha_gerente}'`;
	console.log(instrucaoSqlGerente);

	sequelize.query(instrucaoSqlGerente, {
		model: Gerente
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ', sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Email e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo email e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.post('/deletar/', function (req, res, next) {
	console.log('deletando um usuário');

	var idUsuario = req.body.delete;

	let instrucaoSql = `DELETE FROM agente_de_estacao WHERE ID = ${idUsuario};`;

	sequelize.query(instrucaoSql, {
		model: Usuario,
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

router.post('/update/', function (req, res, next) {
	console.log('atualizando email e senha do usuário');

	var idUsuario = req.body.id;
	var email = req.body.email;
	var senha = req.body.senha;

	let instrucaoSql = `UPDATE agente_de_estacao SET login_agente = '${email}', senha_agente = '${senha}' where id = ${idUsuario};`;

	sequelize.query(instrucaoSql, {
		model: Usuario,
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
