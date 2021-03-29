import config from "../config";
import mongoose from "mongoose";

class MongoClient {
    public async connect() {
        try {
            const client = await mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("Successfully connected to database. ");
        } catch (err) {
            console.log("There was an error connecting to the database.", err);
        }
    }
}



export default new MongoClient();