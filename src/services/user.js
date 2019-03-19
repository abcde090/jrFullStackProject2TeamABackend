const User = require('../models/user');
const findByField = async (field) => {
    return await User.findOne(field);
}

const createUser = async (payload) => {
    const { email, password } = payload;
    const user = new User({
        email,
        password
    })
    return user.save();
}


module.exports = {
    findByField,
    createUser
}

