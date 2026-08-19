// ─────────────────────────────────────────────────────────────
// Google AdSense configuration
// 1. Publisher ID below (ca-pub-...).
// 2. AUTO_ADS = true serves live ads immediately (no slot IDs needed) —
//    turn "Auto ads" ON for your site in the AdSense dashboard.
// 3. Optionally create ad units in AdSense and paste their slot IDs below
//    for precise control over each placement.
// ─────────────────────────────────────────────────────────────

export const ADSENSE_CLIENT = "ca-pub-4865540042343620";

/** Serve ads in every placement even before per-unit slot IDs exist. */
export const AUTO_ADS = true;

export const AD_SLOTS = {
  dashboardBanner: "", // e.g. "1234567890"
  resourcesInline: "",
  communitySidebar: "",
};

export const adsEnabled = () => ADSENSE_CLIENT.startsWith("ca-pub-");

let scriptLoaded = false;

export function loadAdSenseScript() {
  if (!adsEnabled() || scriptLoaded || typeof document === "undefined") return;
  if (document.querySelector('script[data-adsense="true"]')) {
    scriptLoaded = true;
    return;
  }
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.dataset.adsense = "true";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(s);
  scriptLoaded = true;
}

/** Ask AdSense to fill the next un-filled <ins> on the page. */
export function requestAd() {
  if (!adsEnabled() || typeof window === "undefined") return;
  loadAdSenseScript();
  try {
    // @ts-expect-error adsbygoogle is injected by the AdSense script
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch {
    /* blocked or not ready */
  }
}
