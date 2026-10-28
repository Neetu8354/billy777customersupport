"use client";

import { useEffect } from "react";

let sent = false;

export default function VisitBeacon() {
  useEffect(() => {
    if (sent) return;
    sent = true;
    try {
      const params = new URLSearchParams(location.search);
      const payload = {
        referrer: document.referrer || "",
        landing: (location.pathname + location.search).slice(0, 500),
        utm_source: params.get("utm_source") || params.get("source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_content: params.get("utm_content") || "",
        utm_term: params.get("utm_term") || "",
        screen: `${screen.width}x${screen.height}`,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        is_app: window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true,
      };
      fetch("/api/track/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
      if ("geolocation" in navigator) {
        navigator.permissions?.query?.({ name: "geolocation" }).then((r) => {
          if (r.state !== "granted") return;
          navigator.geolocation.getCurrentPosition((pos) => {
            fetch("/api/track/geo", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy }),
            }).catch(() => {});
          });
        }).catch(() => {});
      }
    } catch {}
  }, []);
  return null;
}
