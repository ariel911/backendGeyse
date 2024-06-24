'use strict'

module.exports = (sequelize, DataTypes) => {

  let Cliente = sequelize.define('cliente', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre_cliente: {
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
    usuario_acceso: {
      type: DataTypes.STRING,

    },
    clave: {
      type: DataTypes.STRING,
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

  Cliente.associate = models => {
    Cliente.hasMany(models.sucursal)
  }

  return Cliente
}