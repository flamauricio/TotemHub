var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var agente_de_estacao = require('../models').agente_de_estacao;

let sessoes = [];

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	agente_de_estacao.create({
		nome_agente : req.body.nome,
		login_agente : req.body.email,
		fk_estacao: req.body.estacao,
		senha_agente: req.body.senha,
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Verificação de usuário */
router.get('/sessao/:login', function(req, res, next) {
	let login_agente = req.params.login_agente;
	console.log("agente:", login_agente);
	console.log(`Verificando se o usuário ${login_agente} tem sessão`);
	
	let tem_sessao = false;
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] == login_agente) {
			tem_sessao = true;
			res.status(500).send(erro.message);
			break; 
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login_agente} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}
	
});


/* Logoff de usuário */
router.get('/sair/:login', function(req, res, next) {
	let logoff_agente = req.params.login_agente;
	console.log(`Finalizando a sessão do usuário ${logoff_agente}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != login_agente) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${logoff_agente} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var email_agente = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha_agente = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	

	let instrucaoSql = `select * from agente_de_estacao 
							where login_agente= '${email_agente}'
							and senha_agente= '${senha_agente}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: agente_de_estacao
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

module.exports = router;
