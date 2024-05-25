const sequelize = require('./config/DBconnection');
const User = require('./config/userModel');

const addTokenDetails = async (email, uuid) => {
    try {
        await User.update({token: uuid, tokenExpiry: Date.now() + 120000 }, {
            where: {
                email:email 
            }
        });
        //try .then and .catch approach
    } catch (error) {
        console.log(error);
    }
}
module.exports = addTokenDetails;