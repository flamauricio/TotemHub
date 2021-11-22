module.exports = (sequelize, DataTypes) => {
    let Feedback = sequelize.define('Feedback', {
        idFeedback: {
            field: 'idFeedback',
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        },
        fk_estacao: {
            field: 'fk_estacao',
            type: DataTypes.INTEGER,
            foreignKey: true,
            autoIncrement: false
        }

    }, {
        tableName: 'Feedback',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return Feedback;
};