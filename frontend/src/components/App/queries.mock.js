import { CLIENTS } from "./queries";
import { MOCK_CLIENTS } from "./constants";
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
