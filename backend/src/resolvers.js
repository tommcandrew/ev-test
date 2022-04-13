import Client from "./models/Client.js";

const resolvers = {
  Query: {
    clients: async () => Client.find(),
  },
  Mutation: {
    createClient: async (_, { name, email, company }) => {
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        throw new Error("A client with this email already exists.")
      }
      const client = new Client({ name, email, company });
      await client.save();
      return client;
    },
    deleteClient: async (_, { id }) => {
      await Client.deleteOne({ _id: id });
      return true;
    },
  },
};

export default resolvers;
