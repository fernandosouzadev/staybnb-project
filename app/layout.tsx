import "./globals.css";
import { Nunito } from "next/font/google";
import { Navbar } from "./components/Navbar/Navbar";
import { ReduxProvider } from "@/app/providers/ReduxProvider";
import { ToasterProvider } from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import ClientSessionProvider from "./providers/ClientSessionProvider";
import { getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Staybnb - Feel at Home, Anywhere You Go",
  description: "Staybnb vacation rentals, homes, experiences & places",
  icons: {
    icon: "/images/favicon.png",
  },
};

initializeFaro({
  url:
    process.env.NEXT_PUBLIC_FARO_URL || "https://faro.grafana.net/api/traces",
  app: {
    name: "staybnb",
    version: "1.0.0",
    environment: "production",
  },

  instrumentations: [
    // Mandatory, omits default instrumentations otherwise.
    ...getWebInstrumentations(),

    // Tracing package to get end-to-end visibility for HTTP requests.
    new TracingInstrumentation(),
  ],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProvider>
          <ToasterProvider />
          <div className="flex flex-col min-h-screen">
            <ClientSessionProvider>
              <Navbar user={user} />
              <div className="flex-grow pt-20">{children}</div>
            </ClientSessionProvider>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
