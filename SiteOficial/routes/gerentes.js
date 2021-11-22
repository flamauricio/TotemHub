var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Gerente = require('../models').Gerente;


let sessoes = [];

router.post('/autenticar2', function(req, res, next) {
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
			console.log('sessoes: ',sessoes);
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

// router.post('/cadastrar', function(req, res, next) {
// 	console.log('Criando um usuário');
	
// 	Gerente.create({
// 		nome_gerente : req.body.nome,
// 		login_gerente : req.body.email,
// 		senha_gerente: req.body.senha,
//         fk_estacao: req.body.estacao
// 	}).then(resultado => {
// 		console.log(`Registro criado: ${resultado}`)
//         res.send(resultado);
//     }).catch(erro => {
// 		console.error(erro);
// 		res.status(500).send(erro.message);
//   	});
// });

router.get('/sessao/:login', function(req, res, next) {
	let login_gerente = req.params.login_gerente;
	console.log("agente:", login_gerente);
	console.log(`Verificando se o usuário ${login_gerente} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
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
