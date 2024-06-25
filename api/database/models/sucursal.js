'use strict'

module.exports = (sequelize, DataTypes) => {

  let Sucursal = sequelize.define('sucursal', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre_sucursal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nombre_encargado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.INTEGER,
    },
    fecha_registro: {
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

  Sucursal.associate = models => {
    Sucursal.hasMany(models.extintor)
    Sucursal.belongsTo(models.cliente) 

  }

  return Sucursal
}