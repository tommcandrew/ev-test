import CREATE_CLIENT from "../mutations/createClient";

export const createClientMock = (
  name = "client1",
  email = "client1@gmail.com",
  company = "company1"
) => ({
  request: {
    query: CREATE_CLIENT,
    variables: {
      name,
      email,
      company,
    },
  },
  result: {
    data: {
      id: "1",
    },
  },
});
