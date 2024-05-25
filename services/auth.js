// const User = require("../models/userModel")
// const bcrypt = require("bcrypt");

// async function validUser(username, password){
//     const user = await User.findOne({ where: { email : username}});
//     const passwordMatched = await bcrypt.compare(password, user.password);

//     if(user && password){
//         return user;
//     } else {
//         return null;
//     }
// }

// module.exports = {
//     validUser
// };