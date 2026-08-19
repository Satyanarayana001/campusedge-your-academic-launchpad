import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ADSENSE_CLIENT, AUTO_ADS, adsEnabled, requestAd } from "@/lib/ads";

interface AdSlotProps {
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

export default function AdSlot({ slot = "", format = "auto", className = "", label = "Advertisement" }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const location = useLocation();
  const [filled, setFilled] = useState(false);
  const live = adsEnabled() && (!!slot || AUTO_ADS);

  // Re-request an ad whenever this slot mounts or the route changes (live refresh).
  useEffect(() => {
    if (!live) return;
    const el = ref.current;
    if (!el) return;
    if (el.getAttribute("data-adsbygoogle-status")) return;
    requestAd();
  }, [live, slot, location.pathname]);

  // Watch fill status so the placeholder disappears the moment an ad renders.
  useEffect(() => {
    const el = ref.current;
    if (!el || !live) return;
    const check = () => setFilled(el.getAttribute("data-ad-status") === "filled");
    check();
    const observer = new MutationObserver(check);
    observer.observe(el, { attributes: true, attributeFilter: ["data-ad-status", "data-adsbygoogle-status"] });
    return () => observer.disconnect();
  }, [live, location.pathname]);

  if (!live) {
    return (
      <div className={`glass-card rounded-xl border border-dashed border-border p-6 text-center ${className}`}>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Ad space</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add your AdSense publisher ID in <span className="font-medium text-foreground">src/lib/ads.ts</span> to start earning here.
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl ${className}`}>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
      <ins
        key={location.pathname + slot}
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block", minHeight: filled ? undefined : 90 }}
        data-ad-client={ADSENSE_CLIENT}
        {...(slot ? { "data-ad-slot": slot } : { "data-ad-format": "auto", "data-ad-layout-key": undefined })}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
