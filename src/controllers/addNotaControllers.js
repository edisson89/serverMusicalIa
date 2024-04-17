const {
    aws
} = require("aws-sdk/client-dynamodb")

const {
    v4
} = require("uuid")

async function addNotaControllers(titulo, descripcion) {
    const USERS_TABLE = process.env.USERS_TABLE
    const dynamodb = new aws.DynamoDB.DocumentClient();
    const createAT = new Date()
    const userId = v4()
    const nota = {
        userId,
        createAT,
        titulo,
        descripcion,
    }
    const result = await dynamodb.put({
        TableName: USERS_TABLE,
        Item: {
            nota
        }
    }).promise()
    return result

}
module.exports = addNotaControllers