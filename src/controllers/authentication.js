const jwt = require('../utils/jwt')
const User = require('../models/user');

module.exports = async (req, res) => {
    const { email, password } = req.body;
    const user = new User({
        email,
        password

    })
    try{
    const x = await user.save();
    console.log(x)
    }
    catch{
        console.log(error);
    }
}