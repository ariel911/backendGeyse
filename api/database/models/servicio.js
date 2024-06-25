'use strict'

module.exports = (sequelize, DataTypes) => {

    let Servicio = sequelize.define('servicio', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        observaciones: {
            type: DataTypes.STRING,
        },
        estado: {
            type: DataTypes.INTEGER,
        },
        proximo_mantenimiento: {
            type: DataTypes.DATE,
        },
        proximo_ph: {
            type: DataTypes.DATE,
        },
        fecha_servicio: {
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

    Servicio.associate = models => {
        Servicio.hasMany(models.servicio_trabajo)
        Servicio.belongsTo(models.usuario)
        Servicio.belongsTo(models.extintor)
    }

    return Servicio
}