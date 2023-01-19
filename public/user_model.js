const mongoose = require('mongoose');
var uniqueValidato = require('mongoose-unique-validator');


let valdidRoles = {
    values: ["ADMIN", "USER"],
    message: '{VALUE} invalid role'
}

let Schema = mongoose.Schema;


let userSchema = new Schema({
    name: {
        type: String,
        requier: [true, 'Name is necessary'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email necessary'],
    },
    password: {
        type: String,
        requier: [true, 'Password is obligatory'],
    },
    role: {
        type: String,
        default: 'User',
        requier: [true],
        enum: valdidRoles,
    },
});


userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}


userSchema.plugin(uniqueValidator, {
    message: '{PATH} needs to be unic'
})

module.exports = mongoose.model('User', userSchema)