declare global {
  interface Window {
    ENV: {
      VITE_SANITY_STUDIO_PROJECT_ID: string;
      VITE_SANITY_STUDIO_DATASET: string;
      VITE_SANITY_STUDIO_URL: string;
      VITE_SANITY_STUDIO_STEGA_ENABLED: string;
    };
  }
}

const {
  VITE_SANITY_STUDIO_PROJECT_ID: SANITY_STUDIO_PROJECT_ID,
  VITE_SANITY_STUDIO_DATASET: SANITY_STUDIO_DATASET,
  VITE_SANITY_STUDIO_URL: SANITY_STUDIO_URL = "http://localhost:3333",
  VITE_SANITY_STUDIO_STEGA_ENABLED: SANITY_STUDIO_STEGA_ENABLED = false,
} = typeof document === "undefined" ? process.env : window.ENV;

export const projectId = SANITY_STUDIO_PROJECT_ID!;
export const dataset = SANITY_STUDIO_DATASET!;
export const studioUrl = SANITY_STUDIO_URL!;
export const stegaEnabled = true;

if (!projectId) throw new Error("Missing SANITY_STUDIO_PROJECT_ID in .env");
if (!dataset) throw new Error("Missing SANITY_STUDIO_DATASET in .env");
if (!studioUrl) throw new Error("Missing SANITY_STUDIO_URL in .env");
if (!stegaEnabled)
  throw new Error(`Missing SANITY_STUDIO_STEGA_ENABLED in .env`);
