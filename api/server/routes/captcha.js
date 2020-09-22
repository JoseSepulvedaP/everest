const express = require('express');
const app = express();
const Captcha = require('../models/captcha');
const { validateDoor } = require('../middlewares/validateDoor');

// ===========================
//  Obtener un nuevo captcha
// ===========================
app.get('/captcha/:door', validateDoor,  (req, res) => {
    const { door } = req.params;
    Captcha.find({ usedByLastDoor: { $not: { $in: door } } })
            .exec((err, captchaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (captchaDB.length === 0) {
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'No fue posible obtener captcha'
                    }
                });
            }
            const random = Math.floor(Math.random() * (captchaDB.length - 0) + 0);
            const newCaptcha = captchaDB[random];
            update(newCaptcha._id, door);
            res.json({
                ok: true,
                captcha: newCaptcha
            });
        });
});

// ==========================================================
//  Actualizar campo usedByLastDoor usado por ultima puerta
// ==========================================================
const update = (id, door) => {
    Captcha.updateOne({ _id: id }, { usedByLastDoor: door })
    .exec()
} 

// ===========================
//  Crear un nuevo captcha
// ===========================
app.post('/captcha', (req, res) => {
    const { captcha: key = [] } = req.body;
    const captcha = new Captcha({
        captcha: key,
        usedByLastDoor: ''
    });
    captcha.save((err, captchaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            captcha: captchaDB
        });
    });
});

module.exports = app;