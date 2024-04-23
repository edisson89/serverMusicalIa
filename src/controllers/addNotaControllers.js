
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");


async function addNotaControllers(titulo, descripcion) {
    try {
    require('dotenv').config();
    const { v4: uuidv4 } = require("uuid");
    const client = new DynamoDBClient();
    const dynamoDbClient = DynamoDBDocumentClient.from(client);
    const USERS_TABLE =  process.env.USERS_TABLE;
    //const dynamodb = new DynamoDBClient();
    const createAT = new Date();
    const formattedDate = createAT.toISOString().split('T')[0]; // "2024-04-22"
    const userId = uuidv4();
    const nota = {
        userId,
        formattedDate,
        titulo,
        descripcion,
    };
    
    const params = {
        TableName: USERS_TABLE,
        Item: nota,
    };
      
    
    const {Item} = await dynamoDbClient.send(new PutCommand(params))
    console.log('item',Item.Attributes)
    if(Item){
       return 'item fue creado'
    }  else{
        return 'No enviado'
    }
               
    } catch (error) {
        
       throw new error({error:error.message})
    }
}

module.exports = addNotaControllers;
