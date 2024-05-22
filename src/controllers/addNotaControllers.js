const {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand
} = require("@aws-sdk/client-dynamodb");
const { GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");

async function addNotaControllers (titulo, descripcion){
  try {
    require("dotenv").config();
    const {
      v4: uuidv4
    } = require("uuid");
    const USERS_TABLE = process.env.USERS_TABLE;
    const userId = uuidv4();
    
    const client = new DynamoDBClient();
    
    const createAT = new Date();
    const formattedDate = createAT.toISOString().split("T")[0]; // "2024-04-22"
    
    const nota = {
      userId,
      titulo,
      descripcion,
      formattedDate,
    };
    
    
    const params = {
      TableName: USERS_TABLE,
      Key: {
        userId: userId,
      },
    };
    // Verificar si la nota ya existe
    
    const VerificarItem = await client.send(new GetCommand(params));
    console.log('in',VerificarItem)
    const existItem = VerificarItem.Item
    

    if(existItem){
      const newItem = VerificarItem.Item.userId !== undefined
      if (newItem) {
      throw new Error('Item ya existe')

    } else {
      const paramsNote = {
        TableName: users-table-dev,
        Item: nota,
      };
      console.log(paramsNote)
      const result = await client.send(new PutCommand(paramsNote));
      const newResult = result.Attributes
      return newResult
    }
    }
    console.log(newItem)
 

  } catch (error) {

    throw error
  }
}

module.exports = addNotaControllers;