'use strict'

module.exports = (sequelize, DataTypes) => {

    let Trabajo = sequelize.define('trabajo', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nombre_trabajo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
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

    Trabajo.associate = models => {
        Trabajo.hasMany(models.servicio_trabajo)
        
    }

    return Trabajo
}