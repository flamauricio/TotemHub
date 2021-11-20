

module.exports = (sequelize, DataTypes) => {
    let leads = sequelize.define('leads',{
		id_lead: {
			field: 'id_lead',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome_lead: {
			field: 'nome_lead',
			type: DataTypes.STRING,
			allowNull: false
		},
		email_lead: {
			field: 'email_lead',
			type: DataTypes.STRING,
			allowNull: false
		},
		descricao_lead: {
			field: 'descricao_lead',
			type: DataTypes.STRING,
			allowNull: false
		},
		
	}, 
	{
		tableName: 'leads', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return leads;
};
