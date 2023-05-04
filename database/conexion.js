const mongoose = require("mongoose");

mongoose.connect(process.env.DB)
    .then(() => console.log('DB conectada 🔥🔥'))
    .catch((e) => console.log('Fallo la conexion de la db 😭'))