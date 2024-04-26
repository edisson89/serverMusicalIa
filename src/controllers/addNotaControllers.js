const {
  DynamoDBClient,
  
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,

} = require("@aws-sdk/lib-dynamodb");

async function addNotaControllers(titulo, descripcion) {
  try {
    require("dotenv").config();
    const {
      v4: uuidv4
    } = require("uuid");
    const USERS_TABLE = process.env.USERS_TABLE;
    const userId = uuidv4();

    const client = new DynamoDBClient();
    const dynamoDbClient = DynamoDBDocumentClient.from(client);

    const createAT = new Date();
    const formattedDate = createAT.toISOString().split("T")[0]; // "2024-04-22"

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

    // Verificar si la nota ya existe
    const existingNote = await dynamoDbClient.send(new GetCommand({
      TableName: USERS_TABLE,
      Key: {
        "titulo": titulo,
        
      }
    }));

    // Si la nota ya existe, lanzar un error
    if (!existingNote || !existingNote.Item) {
      await dynamoDbClient.send(new PutCommand(params));

      return nota;


    } else {

      console.log('ingreso error', existingNote)
      throw new Error("La nota ya existe en la base de datos");
    }


  } catch (error) {

    throw error
  }
}

module.exports = addNotaControllers;