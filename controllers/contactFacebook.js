const express = require('express');
const router = express.Router()
const ContactFacebookForm = require('../models/ContactFacebookForms');

// router.get('/', (req, res) => {
//     Form.find()
//         .then(users => res.json(users))
//         .catch(err => console.log(err))
// })
const addContactFacebookForm=async (req, res) => {

    const newContactFacebookForm = new ContactFacebookForm({ contactFacebookForm: req.body })

    newContactFacebookForm.save()
        .then(() => res.json({
            message: "Added Form successfully"
        }))
        .then((res) => {
            console.log(res)
        })
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
}
module.exports = {addContactFacebookForm}