import { CLIENTS } from "./queries/clients.js";
import { MOCK_CLIENTS } from "../../constants/mockData.js";
export function clientsMock() {
  return {
    request: {
      query: CLIENTS,
    },
    result: {
      data: {
        clients: MOCK_CLIENTS,
      },
    },
  };
}
