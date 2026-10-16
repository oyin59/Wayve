import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wayve",
    short_name: "Wayve",
    description: "Hyperlocal, vibe-based place discovery in Abuja.",
    start_url: "/discover",
    display: "standalone",
    background_color: "#FCF1D0",
    theme_color: "#432F2E",
    icons: [
      {
        src: "/wayve-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
