import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

const uri = process.env.MONGODB_CONNECTION_STRING!
const client = new MongoClient(uri)

await client.connect()
console.log("Established client connection")

// By exporting the database instead of the client, we can prevent multiple connections
const db = client?.db(process.env.MONGODB_DB_NAME!)

async function initMongoDbClient() {
    try {
        //const uri = process.env.MONGODB_CONNECTION_STRING!
        //const client = new MongoClient(uri)
        //await client.connect()

        console.log("Successfully connected to MongoDB database")
        return client
    } catch (error) {
        console.error(`Failed to connect to MongoDB database: ${error}`)
    }
}

export { initMongoDbClient, db }