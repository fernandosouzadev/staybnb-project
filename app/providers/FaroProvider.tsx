// app/providers/FaroProvider.tsx
"use client";

import { useEffect } from "react";
import { initializeFaro } from "@grafana/faro-web-sdk";
import { getWebInstrumentations } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import { ReactIntegration } from "@grafana/faro-react";

export function FaroProvider() {
  useEffect(() => {
    initializeFaro({
      url:
        process.env.NEXT_PUBLIC_FARO_URL ||
        "https://faro.grafana.net/api/traces",
      app: {
        name: "staybnb",
        version: "1.0.0",
        environment: process.env.NODE_ENV || "development",
      },
      instrumentations: [
        ...getWebInstrumentations(),
        new TracingInstrumentation(),
        new ReactIntegration(),
      ],
    });
  }, []);

  return null;
}
