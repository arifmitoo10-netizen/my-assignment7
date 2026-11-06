// import { MongoClient } from "mongodb";

// // The client connects lazily, so a missing URI never breaks `next build`.
// const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";

// const globalForMongo = globalThis as unknown as { _bazarMongo?: MongoClient };

// export const client = globalForMongo._bazarMongo ?? new MongoClient(uri);
// if (process.env.NODE_ENV !== "production") globalForMongo._bazarMongo = client;

// export const db = client.db(process.env.MONGODB_DB || "bazardor");



import { MongoClient } from "mongodb";

const uri =
  process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";

const globalForMongo = globalThis as unknown as {
  _bazarMongo?: MongoClient;
};

export const client =
  globalForMongo._bazarMongo ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._bazarMongo = client;
}

export const db = client.db("my-assignment7");
