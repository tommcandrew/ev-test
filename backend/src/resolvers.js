import Client from "./models/Client.js";

const resolvers = {
  Query: {
    clients: async () => Client.find(),
  },
  Mutation: {
    createClient: async (_, { name, email, company }) => {
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        throw new Error("A client with this email already exists.");
      }
      const client = new Client({ name, email, company });
      await client.save();
      return client;
    },
    deleteClient: async (_, { id }) => {
      const client = await Client.findById(id);
      await client.delete();
      return client;
    },
  },
};

export default resolvers;
