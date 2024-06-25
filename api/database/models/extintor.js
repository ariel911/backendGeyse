'use strict'

module.exports = (sequelize, DataTypes) => {

    let Extintor = sequelize.define('extintor', {
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
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ubicacion: {
            type: DataTypes.STRING,
            
        },
        capacidad: {
            type: DataTypes.STRING,
        
        },
        estado: {
            type: DataTypes.INTEGER,
        },
        fecha_registro: {
            type: DataTypes.DATE,
        },
        codigo_extintor:{
            type:DataTypes.STRING,
            
        },
        codigo_empresa:{
            type:DataTypes.STRING,
            
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

    Extintor.associate = models => {
        Extintor.hasMany(models.inspeccion) 
        Extintor.hasMany(models.servicio) 
        Extintor.belongsTo(models.tipo) 
        Extintor.belongsTo(models.usuario) 
        Extintor.belongsTo(models.sucursal) 
    }

    return Extintor
}