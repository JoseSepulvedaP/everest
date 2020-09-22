const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const captchaSchema = new Schema({
    captcha: { type: Array, required: true },
    usedByLastDoor: { type: String, required: false }
}, { collection: 'captcha' });


module.exports = mongoose.model('Captcha', captchaSchema);