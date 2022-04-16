import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
});

clientSchema.set("timestamps", true);

const Client = mongoose.model("Client", clientSchema);

export default Client;
