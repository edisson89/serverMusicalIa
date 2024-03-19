const aws = require("aws-sdk")
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand
} = require('@aws-sdk/lib-dynamodb')
const client = new DynamoDBClient()
const dynamoDbClient = DynamoDBDocumentClient.from(client)
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
    const result = await dynamoDbClient.send(new PutCommand({
        TableName: USERS_TABLE,
        Item: {
            nota
        }
    })).promise()
    return result

}
module.exports = addNotaControllers