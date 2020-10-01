const mongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017"; 
const database = "mongoEjercicio";


function mongoUtils(){
    const mu = {}; 
    mu.conn = () => {
        const client = new mongoClient(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000,
            keepAlive: 1,
            auto_reconnect: true,
        });
        return client.connect();
    }
    return mu;
}
exports.mongoUtils = mongoUtils();
exports.database = database;