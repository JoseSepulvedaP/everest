// Parámetros de busqueda permitidos puertas
const keys = ['A', 'B', 'C'];

/** 
 * Valida puerta ingresada 
*/
const validateDoor = (req, res, next) => {
    const { door } = req.params;
    if (keys.indexOf(door) === -1) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `Parámetro ${door} enviado no es válido`
            }
        });
    }
    next();
};

module.exports = {
    validateDoor
}