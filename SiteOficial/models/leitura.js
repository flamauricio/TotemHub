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
        fk_totem: {
			field: 'fk_totem',
			type: DataTypes.STRING(100).BINARY,
		},
		sistema_operacional: {
			field: 'sistema_operacional',
			type: DataTypes.STRING,
		},	
		cpu_totem_em_uso: {
			field: 'cpu_totem_em_uso',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		memoria_em_uso: {
			field: 'memoria_em_uso',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		memoria_total: {
			field: 'memoria_total',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		horario_totem: {
			field: 'horario_totem',
			type: DataTypes.CHAR(100).BINARY, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
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