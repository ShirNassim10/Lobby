

const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    Openning_Massage: String,
    endMessage: String,
    chatProfileImag: String,
    chat_name: String,
    chatTitle: String,
    chatSubTitle: String,
    chatColor: String,
    allowRegistration: Boolean,
    direction: String,
    autoMassage: String,
    convincingStatment: String,
    viewers: [
        { date: { type: String }, amount: { type: Number } }
    ],
    //message the user is getting when someone is trying chat with him.
    messageForSelfEmail: {
        type: String,
        default: 'Someone is trying to contact you in the chat'
    }
})


module.exports = mongoose.model('Chat', chatSchema)

