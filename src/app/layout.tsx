import type { Metadata, Viewport } from "next";
import { AreaProvider } from "@/providers/AreaProvider";
import { SavedPlacesProvider } from "@/providers/SavedPlacesProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayve",
  description: "Hyperlocal, vibe-based place discovery in Abuja.",
  applicationName: "Wayve",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#432F2E",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <ServiceWorkerRegistration />
        <AreaProvider>
          <SavedPlacesProvider>{children}</SavedPlacesProvider>
        </AreaProvider>
      </body>
    </html>
  );
}
