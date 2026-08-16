// ─────────────────────────────────────────────────────────────
// Google AdSense configuration
// 1. Sign up at https://adsense.google.com and get approved.
// 2. Paste your publisher ID below (looks like "ca-pub-1234567890123456").
// 3. Create ad units in AdSense and paste their slot IDs below.
// Until ADSENSE_CLIENT is filled in, placeholders are shown instead of ads.
// ─────────────────────────────────────────────────────────────

export const ADSENSE_CLIENT = "ca-pub-4865540042343620"; // e.g. "ca-pub-1234567890123456"

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
