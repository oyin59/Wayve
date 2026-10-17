import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wayve",
    short_name: "Wayve",
    description: "Hyperlocal, vibe-based place discovery in Abuja.",
    start_url: "/discover",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#303820",
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
