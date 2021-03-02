import mongoose from "mongoose";

let database: mongoose.Connection;

export const connectBDD = (dbUri: string) => {
  const uri = dbUri;
  if (database) {
    return;
  }
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};

export const disconnectBDD = () => {
  if (!database) {
    return;
  }
  mongoose.disconnect();
};
