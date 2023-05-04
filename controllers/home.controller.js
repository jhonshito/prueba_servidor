const { Usuarios } = require('../models/models')

// agregar los datos del usuario a la base de datos
const addUsuarios = (req, res) => {

    const { nombre, nacimiento, correo } = req.body

    Usuarios.findOne({ correo: correo }).then((user) => {
        if(user){
            res.status(404).json({
                status: 404,
                mensaje: 'Tu correo ya esta registrado en nuestro sistema'
            })
        }else {

            switch(true){
                case !nombre:
                    res.status(400).json({
                        status: 400,
                        mensaje: 'El nombre es requerido'
                    })
                    break;
                case !nacimiento:
                    res.status(400).json({
                        status: 400,
                        mensaje: 'la fecha de nacimiento es requerida'
                    })
                    break;
                case !correo:
                    res.status(400).json({
                        status: 400,
                        mensaje: 'el correo es requerido'
                    })
                    break;
                default:

                    const fechaDeNacimiento = new Date(nacimiento);
                    const fechaActual = new Date();
        
                    const edad = fechaActual.getFullYear() - fechaDeNacimiento.getFullYear()
        
                    if(fechaActual.getMonth() < fechaDeNacimiento.getMonth() || (fechaActual.getMonth() === fechaDeNacimiento.getMonth() && fechaActual.getDate() < fechaDeNacimiento.getDate())){
                        edad--;
                    }
                    
                    const fechaDeNacimientoSinHora = fechaDeNacimiento.toISOString().substr(0, 10);

                    const nuevoUsuarios = new Usuarios({ nombre: nombre, nacimiento: fechaDeNacimientoSinHora, edad: edad, correo: correo })

                    nuevoUsuarios.save().then((usuario) => {
                        if(usuario){
                            res.status(200).json({
                                status: 200,
                                mensaje: 'Datos guardados exitosamente',
                                usuario
                            })
                        }else {
                            res.status(404).json({
                                status: 404,
                                mensaje: 'No se pudo guardar los datos'
                            })
                        }
                    })
                    .catch((e) => {
                        res.status(500).json({
                            status: 500,
                            mensaje: 'Error al guardar los datos',
                            e
                        })
                    })

                    break;
            }

            
            
        }
    })
    .catch((e) => {
        res.status(500).json({
            status: 500,
            mensaje: 'Error al buscar al usuario',
            e
        })
    })
}

module.exports = {
    addUsuarios
}