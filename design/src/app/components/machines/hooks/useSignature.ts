import { useState, useRef, useEffect } from "react";

const SIG_KEY_PREFIX = "its_sig_";

export function useSignature(customerName: string) {
  const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
  const [mode, setMode] = useState<"direct" | "qr">(isMobileDevice ? "direct" : "qr");
  const [value, setValue] = useState("");
  const sessionId = useRef(Math.random().toString(36).substr(2, 9));

  const qrUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/sign?session=${sessionId.current}&name=${encodeURIComponent(customerName)}`
      : "";

  // Listen for signature from mobile via storage event (same browser, cross-tab)
  useEffect(() => {
    const key = SIG_KEY_PREFIX + sessionId.current;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setValue(e.newValue);
        localStorage.removeItem(key);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Poll localStorage as fallback (1s interval)
  useEffect(() => {
    if (mode !== "qr") return;
    const key = SIG_KEY_PREFIX + sessionId.current;
    const interval = setInterval(() => {
      const stored = localStorage.getItem(key);
      if (stored) {
        setValue(stored);
        localStorage.removeItem(key);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [mode]);

  const handleReset = () => {
    setValue("");
    // Fresh session ID so QR code refreshes
    sessionId.current = Math.random().toString(36).substr(2, 9);
  };

  const setSignature = (sig: string) => {
    setValue(sig);
  };

  return {
    mode,
    setMode,
    value,
    qrUrl,
    setSignature,
    handleReset,
  };
}
