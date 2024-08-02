import { queryStore } from "./loader";
import { client } from "./clientConfig";

export const { loadQuery } = queryStore;

queryStore.setServerClient(client);
