const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Message extends Model {}

Message.init({

    message:{
        type: DataTypes.STRING,
    },
    author:{
        type: DataTypes.STRING,
    }
},
{
    sequelize,
    modelName: 'Message',
}
);

Message.sync();
module.exports = Message;