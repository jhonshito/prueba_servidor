const mongoose = require("mongoose");

const { Schema } = mongoose

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required : true
    },

    nacimiento: {
        type: Date,
        required: true
    },

    edad: {
        type: Number,
        required: true
    },

    correo: {
        type: String,
        required: true,
        unique: true
    }
});

const Usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = {
    Usuarios
}