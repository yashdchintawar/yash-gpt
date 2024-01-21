import { connect, disconnect } from "mongoose";
import { config } from "dotenv";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("cannot connect with mongo DB!");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("could Not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
