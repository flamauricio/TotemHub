'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Admin = sequelize.define('Admin',{
	    email_admin: {
			field: 'email_admin',
			type: DataTypes.STRING,
		},
		senha_admin: {
			field: 'senha_admin',
			type: DataTypes.STRING,
			allowNull: false
		},	
	}, 
	{
		tableName: 'admin', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Admin;
};
