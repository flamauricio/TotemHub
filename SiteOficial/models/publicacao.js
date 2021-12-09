'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Feedback = sequelize.define('Feedback',{	
		id_feedback: {
			field: 'id_feedback',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
        fk_estacao: {
            field: 'fk_estacao',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pontuacao: {
            field: 'pontuacao',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mensagem: {
            field: 'mensagem',
            type: DataTypes.STRING,
            allowNull: false
        }
	}, 
	{
		tableName: 'feedback', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Feedback;
};