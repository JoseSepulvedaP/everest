const express = require('express');
const app = express();
const Captcha = require('../models/captcha');
const { validateDoor } = require('../middlewares/validateDoor');
const { update, arrayEquals } = require('../utils/utils');

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
            const { _id: id, captcha } = newCaptcha;
            update(id, door);
            res.json({
                ok: true,
                captcha: {
                    id,
                    captcha
                }
            });
        });
});

// ===========================
//  Valida captcha
// ===========================
app.post('/validate', (req, res) => {
    const { id, captcha } = req.body;
    let valid = false;
    Captcha.findById(id)
        .exec((err, captchaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                valid,
                err
            });
        }
        if (!captchaDB) {
            return res.status(400).json({
                ok: false,
                valid,
                err: {
                    message: 'ID no existe'
                }
            });
        }
        valid = arrayEquals(captchaDB.captcha, captcha)
        res.json({
            ok: true,
            valid
        });
    });
});

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