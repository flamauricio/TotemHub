create database sprintTotemHub;

use sprintTotemHub;

create table empresa(
	cnpj_empresa int auto_increment,
    nome_empresa varchar(45),
    primary key(cnpj_empresa)
)auto_increment = 1;

insert into empresa(nome_empresa) values
	("TotemHub"),
    ("Lettutech");

select * from empresa;

create table estacao(
	id_estacao int auto_increment,
    fk_empresa int,
    nome_estacao varchar(45),
    qnt_totem int,
    primary key (id_estacao),
    foreign key (fk_empresa) references empresa(cnpj_empresa)
)auto_increment = 1000;

insert into estacao(fk_empresa, nome_estacao, qnt_Totem) values
	(1, "Estação vida real", 4);
    
select * from estacao;

create table agente_de_estacao(
	id int auto_increment,
    fk_estacao int,
    fk_empresa int,
    nome_agente varchar(45),
    login_agente varchar(50),
    senha_agente varchar(20),
    primary key(id),
    foreign key(fk_estacao) references estacao(id_estacao),
    foreign key(fk_empresa) references empresa(cnpj_empresa)
)auto_increment = 10000;

insert into agente_de_estacao(fk_estacao, fk_empresa, nome_agente, login_agente, senha_agente) values	
	(1000, 1, "Jorge", "jotalion.4.jlo@gmail.com", "123");
    
select * from agente_de_estacao;

create table totem(
	id_totem int auto_increment,
    fk_estacao int,
    primary key(id_totem),
    foreign key(fk_estacao) references estacao(id_estacao)
)auto_increment = 100000;

create table historico_totem(
	id_historico int auto_increment,
    fk_agente int,
    fk_totem int,
    cpu_totem int,
    memoria_ram_totem int,
    horario_totem datetime,
    funcionamento_totem char(1),
    primary key(id_historico),
    foreign key(fk_agente) references agente_de_estacao(id),
    foreign key(fk_totem) references totem(id_totem)
)auto_increment = 1000000;

SELECT * from agente_de_estacao join estacao;

show tables;