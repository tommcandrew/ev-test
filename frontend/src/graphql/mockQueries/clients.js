import CLIENTS from "../queries/clients";
import { MOCK_CLIENTS } from "../../constants/mockData";

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
