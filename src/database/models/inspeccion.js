'use strict'

module.exports = (sequelize, DataTypes) => {

    let Inspeccion = sequelize.define('inspeccion', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        observaciones: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
        },
        fecha_inspeccion: {
            type: DataTypes.DATE,
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

    Inspeccion.associate = models => {
        Inspeccion.hasMany(models.inspeccion_estado) 
        Inspeccion.belongsTo(models.extintor) 
        Inspeccion.belongsTo(models.usuario) 
    }

    return Inspeccion
}