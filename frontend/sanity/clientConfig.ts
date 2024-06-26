import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: "0chpibsu",
    dataset: "development",
    apiVersion: "2024-06-24"
  })