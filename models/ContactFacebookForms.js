const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactFacebookForms = new Schema({
    forms: [
        {
            form_name: { type: String },
            form_id: { type: Number },
        },
        { strict: false }
    ],
    user_id:{ type: mongoose.Schema.Types.ObjectId, ref:'User'}
});


module.exports = mongoose.model("ContactFacebookForms", contactFacebookForms)