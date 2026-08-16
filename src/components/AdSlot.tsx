import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, adsEnabled, loadAdSenseScript } from "@/lib/ads";

interface AdSlotProps {
  slot: string;
  format?: string;
  className?: string;
  label?: string;
}

export default function AdSlot({ slot, format = "auto", className = "", label = "Advertisement" }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsEnabled() || !slot || pushed.current) return;
    loadAdSenseScript();
    try {
      // @ts-expect-error adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ad blocked or script unavailable */
    }
  }, [slot]);

  if (!adsEnabled() || !slot) {
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
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
