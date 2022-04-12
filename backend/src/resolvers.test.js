import Client from "./models/Client.js";
import mongoose from "mongoose";
import resolvers from "./resolvers.js";

describe("resolvers", () => {
  describe("queries", () => {
    describe("clients", () => {
        let mockClients;
      beforeAll(() => {
        mockClients = [
          {
            _id: mongoose.Types.ObjectId(),
            name: "Bob",
            email: "bob@gmail.com",
            company: "Google",
          },
          {
            _id: mongoose.Types.ObjectId(),
            name: "Sally",
            email: "sally@gmail.com",
            company: "Microsoft",
          },
        ];
        Client.find = jest.fn().mockResolvedValue(mockClients);
      });
      it("should fetch all clients", async () => {
        const res = await resolvers.Query.clients();
        expect(res).toEqual(mockClients);
      });
    });
  });
});
