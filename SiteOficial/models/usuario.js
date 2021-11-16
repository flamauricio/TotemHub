	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'id',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome_agente: {
			field: 'nome_agente',
			type: DataTypes.STRING,
			allowNull: false
		},
		login_agente: {
			field: 'login_agente',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha_agente: {
			field: 'senha_agente',
			type: DataTypes.STRING,
			allowNull: false
		},
		fk_estacao: {
			field: 'fk_estacao',
			type: DataTypes.INTEGER
			
		},
		
	}, 
	{
		tableName: 'agente_de_estacao', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
