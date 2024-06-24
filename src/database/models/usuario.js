'use strict' // para que no se pueda usar variables no definidas

module.exports = (sequelize, DataTypes) => {

    let Usuario = sequelize.define('usuario', { // defino el modelo de la tabla persona
        id: {
            type: DataTypes.BIGINT, // tipo de dato
            autoIncrement: true, // autoincrementable
            primaryKey: true, // clave primaria 
            allowNull: false // no permitir nulo
        },
        nombre_usuario: { // nombre de la columna
            type: DataTypes.STRING, // tipo de dato
            allowNull: false
        },
        apellido: { // nombre de la columna
            type: DataTypes.STRING, // tipo de dato
            
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clave: {
            type: DataTypes.STRING,
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
        },
        fecha_registro: {
            type: DataTypes.DATE,
        },
        createdAt: { // fecha de creacion
            type: DataTypes.DATE, // tipo de dato
            field: 'created_at', // nombre de la columna
            defaultValue: DataTypes.NOW, // valor por defecto
            allowNull: false // no puede ser nulo
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        deletedAt: { // fecha de eliminacion
            type: DataTypes.DATE, // tipo de dato
            field: 'deleted_at' // nombre de la columna
        }
    }, {
        paranoid: true, // elimina los registros de forma logica
        freezeTableName: true, // no va a modificar el nombre de la tabla a plural
    })

    Usuario.associate = models => {
        Usuario.belongsTo(models.rol) 
        Usuario.hasMany(models.extintor)
        Usuario.hasMany(models.servicio)
        Usuario.hasMany(models.inspeccion)
        
    }

    return Usuario
}