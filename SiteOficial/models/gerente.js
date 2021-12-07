'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Gerente = sequelize.define('Gerente',{
		id_gerente: {
			field: 'id_gerente',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome_gerente: {
			field: 'nome_gerente',
			type: DataTypes.STRING,
			allowNull: false
		},
		login_gerente: {
			field: 'login_gerente',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha_gerente: {
			field: 'senha_gerente',
			type: DataTypes.STRING,
			allowNull: false
		},
		fk_estacao: {
			field: 'fk_estacao',
			type: DataTypes.INTEGER
		},
		
	}, 
	{
		tableName: 'gerente', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Gerente;
};
