const Captcha = require('../models/captcha');

// ==========================================================
//  Actualizar campo usedByLastDoor usado por ultima puerta
// ==========================================================
const update = (id, door) => {
    Captcha.updateOne({ _id: id }, { usedByLastDoor: door })
    .exec()
} 

// ==================================
//  Valida igualdad entre dos array
// ==================================
const arrayEquals = (a, b)  => {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

  module.exports = {
    update,
    arrayEquals
}