const {mongoUtils, database} = require("../mongo");
var ObjectId = require('mongodb').ObjectID;
const collection = "messages"; 



async function getMessages() {
    const client = await mongoUtils.conn(); 
    const messages =  await client
    .db(database)
    .collection(collection)
    .find({})
    .toArray()
    .finally(() => client.close());
    return messages;
}
async function insertMessage(message) {
    return mongoUtils.conn().then((client) => {
        return client.db(database).collection(collection).insertOne(message).finally(() => client.close());
    });
    
}
async function getMessage(idMessage){
    try {
        const client = await mongoUtils.conn(); 
        const message =  await client
        .db(database)
        .collection(collection)
        .find({_id :ObjectId(idMessage+"")})
        .toArray()
        .finally(() => client.close());
        return message;
    } catch (error) {
        return "El mensaje no existe";
    }
}

async function update(idMessage, newMessage){
    try {
        const client = await mongoUtils.conn(); 
        const message =  await client
        .db(database)
        .collection(collection)
        .replaceOne({_id :ObjectId(idMessage+"")}, newMessage)
        .finally(() => client.close());
        return message;
    } catch (error) {
        return "El mensaje a actualizar no existe";
    }
}
async function deleteMessage(idMessage){
    try {
        const client = await mongoUtils.conn(); 
        const message =  await client
        .db(database)
        .collection(collection)
        .deleteOne({_id :ObjectId(idMessage+"")})
        .finally(() => client.close());
        return message;

    } catch (error) {
        return "El mensaje a eliminar no existe";
    }

}


module.exports.insertMessage = insertMessage;
module.exports.getMessages = getMessages;
module.exports.getMessage = getMessage;
module.exports.update = update;
module.exports.deleteMessage = deleteMessage;