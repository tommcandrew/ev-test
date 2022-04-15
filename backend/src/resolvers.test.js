import mongoose from "mongoose";
import sinon from "sinon";
import Client from "./models/Client";
import resolvers from "./resolvers";

describe("resolvers", () => {
  let sandbox;
  let mockSave;
  let mockFind;
  let mockFindOne;
  let mockClients;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockSave = sandbox.stub(Client.prototype, "save");
    mockFind = sandbox.stub(Client, "find");
    mockFindOne = sandbox.stub(Client, "findOne");
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
    mockFindOne.resolves(null);
    mockFind.resolves(mockClients);
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe("queries", () => {
    describe("clients", () => {
      it("should fetch all clients", async () => {
        const res = await resolvers.Query.clients();
        expect(res).toEqual(mockClients);
      });
    });
  });
  describe("mutations", () => {
    describe("createClient", () => {
      let clientData;
      beforeAll(() => {
        clientData = {
          name: "Joe",
          email: "joe@gmail.com",
          company: "Apple",
        };
      });
      it("should create new client", async () => {
        await resolvers.Mutation.createClient(null, clientData);
        sinon.assert.called(mockSave);
      });
    });
  });
});
