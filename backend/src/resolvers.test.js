import mongoose from "mongoose";
import Client from "./models/Client";
import resolvers from "./resolvers";

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
  describe("mutations", () => {
    describe("createClient", () => {
      let clientData;
      let mockSave;
      beforeAll(() => {
        clientData = {
          name: "Joe",
          email: "joe@gmail.com",
          company: "Apple",
        };
        mockSave = jest.fn();
        Client.prototype.save = mockSave;
      });
      it("should create new client", async () => {
        await resolvers.Mutation.createClient(null, clientData);
        expect(mockSave).toHaveBeenCalledTimes(1);
      });
    });
  });
});
