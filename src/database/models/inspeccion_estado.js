'use strict'

module.exports = (sequelize, DataTypes) => {

    let Inspeccion_estado = sequelize.define('inspeccion_estado', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at'
        }
    }, {
        paranoid: true,
        freezeTableName: true,
    })

    Inspeccion_estado.associate = models => {
        Inspeccion_estado.belongsTo(models.estado)  
        Inspeccion_estado.belongsTo(models.inspeccion) 
    }

    return Inspeccion_estado
}