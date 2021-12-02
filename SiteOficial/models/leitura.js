'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Leitura = sequelize.define('historico_totem',{	
		id_historico: {
			field: 'id_historico',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
        fk_agente: {
			field: 'fk_agente',
			type: DataTypes.INTEGER,
		},	
        fk_totem: {
			field: 'fk_totem',
			type: DataTypes.INTEGER,
		},	
		cpu_totem_em_uso: {
			field: 'cpu_totem_em_uso',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		memoria_em_uso: {
			field: 'memoria_em_uso',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		horario_totem: {
			field: 'horario_totem',
			type: DataTypes.STRING, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
        funcionamento_totem: {
			field: 'funcionamento_totem',
			type: DataTypes.CHAR(1).BINARY,
		},

		momento_grafico: {
			type: DataTypes.VIRTUAL, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
			allowNull: true
		}
	}, 
	{
		tableName: 'historico_totem', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Leitura;
};