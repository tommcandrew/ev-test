import Client from "./models/Client.js";

const resolvers = {
  Query: {
    clients: async () => Client.find(),
  },
  Mutation: {
    createClient: async (_, { name, email, company }) => {
      const client = new Client({ name, email, company });
      await client.save();
      return client;
    },
    deleteClient: async (_, { id }) => {
      console.log("DELETE CLIENT RESOLVER")
      console.log('id', id)
      await Client.deleteOne({ _id: id });
      return true;
    },
  },
};

export default resolvers;
