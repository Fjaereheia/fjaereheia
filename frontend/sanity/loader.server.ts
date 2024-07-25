import { client } from "./clientConfig";
import { queryStore } from "./loader";

queryStore.setServerClient(client);

export const { loadQuery } = queryStore;
