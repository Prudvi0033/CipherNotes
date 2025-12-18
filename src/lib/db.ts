import mongoose from "mongoose";

export const ConnectDB = async () : Promise<void> => {
    if(mongoose.connection.readyState >= 1){
        console.log("MongoDb already connected");
    }

    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
            dbName: "linknote"
        })

        console.log("Database connected: ", conn.connection.host);
    } catch (error) {
        console.log("Error in connecting DB", error);
        process.exit(1)
    }
}