import { MongoClient } from "mongodb";

if (!import.meta.env.MONGO_URI) {
  throw new Error('Invalid environment variable: "MONGO_URI"');
}

const uri = import.meta.env.MONGO_URI;
const options = {};

const connectToDB = async () => {
  const mongo = await new MongoClient(uri, options).connect();
  return mongo.db("portifolio");
};

export const getDB = async () => {
  if (import.meta.env.DEV) {
    if (!globalThis._mongoConnection) {
      globalThis._mongoConnection = await connectToDB();
    }
    return globalThis._mongoConnection;
  }

  const mongo = await connectToDB();
  return mongo;
};

export const Messages = async () => {
  const db = await getDB();
  if (!db) {
    throw new Error("Falha ao obter conexao com o MongoDB.");
  }
  return db.collection("messages");
};
