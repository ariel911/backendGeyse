'use strict'

module.exports = (sequelize, DataTypes) => {

    let Servicio_trabajo = sequelize.define('servicio_trabajo', {
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

    Servicio_trabajo.associate = models => {
        Servicio_trabajo.belongsTo(models.servicio)  
        Servicio_trabajo.belongsTo(models.trabajo) 
    }

    return Servicio_trabajo
}