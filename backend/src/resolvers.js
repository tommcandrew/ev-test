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
  },
};

export default resolvers;
