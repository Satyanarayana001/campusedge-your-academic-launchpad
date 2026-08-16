import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Subscribes to live database changes for the given tables and re-runs `reload`
 * whenever anything changes. Keeps every page fresh without a manual refresh.
 */
export function useRealtimeSync(
  channelName: string,
  tables: string[],
  reload: () => void | Promise<void>,
  enabled = true,
) {
  const reloadRef = useRef(reload);
  reloadRef.current = reload;
  const key = tables.join(",");

  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const trigger = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => reloadRef.current(), 250);
    };

    let channel = supabase.channel(`${channelName}-realtime`);
    for (const table of key.split(",")) {
      channel = channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        trigger,
      );
    }
    channel.subscribe();

    return () => {
      if (timer) clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, [channelName, key, enabled]);
}
