const { DataTypes, Sequelize } = require("sequelize")
const {sequelize} = require("../config/connection")
const bcrypt = require("bcrypt");


const User = sequelize.define("User",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value){
            const salt =  bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password',hash);
        },
        allowNull: false,
    },

    token: {
        type: DataTypes.UUID,
    },

    tokenExpiry: {
        type: Sequelize.DATE,
    },

    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,   
    }
},
    {
        timestamps: true,
        createdAt: 'account_created',
        updatedAt: 'account_updated',
    }
);

module.exports = User;
