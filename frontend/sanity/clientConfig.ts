import { createClient } from "@sanity/client";

const toBoolean = (
  value: string | undefined,
  defaultValue: boolean
): boolean => {
  return value === undefined ? defaultValue : value === "true";
};

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID ?? "0chpibsu",
  dataset: import.meta.env.VITE_SANITY_STUDIO_DATASET ?? "production",
  apiVersion: "2024-06-24",
  useCdn: toBoolean(import.meta.env.VITE_SANITY_STUDIO_USE_CDN, true),
  stega: {
    enabled: toBoolean(import.meta.env.VITE_SANITY_STUDIO_STEGA_ENABLED, false),
    studioUrl:
      import.meta.env.VITE_SANITY_STUDIO_URL ??
      "https://fjaereheia.sanity.studio",
  },
});
