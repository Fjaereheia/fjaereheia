import { client } from "./clientConfig";
import { queryStore } from "./loader";

export const { loadQuery } = queryStore;

queryStore.setServerClient(client);
