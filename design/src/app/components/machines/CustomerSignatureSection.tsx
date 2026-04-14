import React, { useState, useRef, useEffect } from "react";
import { Smartphone, Monitor, CheckCircle2, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { SignatureCanvas, SignatureCanvasHandle } from "../SignatureCanvas";

const SIG_KEY_PREFIX = "its_sig_";

interface CustomerSignatureSectionProps {
  customerName: string;
  value: string;
  onChange: (sig: string) => void;
}

export function CustomerSignatureSection({ customerName, value, onChange }: CustomerSignatureSectionProps) {
  const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
  const [mode, setMode] = useState<"direct" | "qr">(isMobileDevice ? "direct" : "qr");
  const sessionId = useRef(Math.random().toString(36).substr(2, 9));
  const sigCanvasRef = useRef<SignatureCanvasHandle>(null);

  const qrUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/sign?session=${sessionId.current}&name=${encodeURIComponent(customerName)}`
      : "";

  // Listen for signature from mobile via storage event (same browser, cross-tab)
  useEffect(() => {
    const key = SIG_KEY_PREFIX + sessionId.current;
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        onChange(e.newValue);
        localStorage.removeItem(key);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [onChange]);

  // Poll localStorage as fallback (1s interval)
  useEffect(() => {
    if (mode !== "qr") return;
    const key = SIG_KEY_PREFIX + sessionId.current;
    const interval = setInterval(() => {
      const stored = localStorage.getItem(key);
      if (stored) {
        onChange(stored);
        localStorage.removeItem(key);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [mode, onChange]);

  const handleReset = () => {
    onChange("");
    sigCanvasRef.current?.reset();
    // Fresh session ID so QR code refreshes
    sessionId.current = Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-gray-700">Chữ ký xác nhận của khách hàng</p>
          {value && (
            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-semibold flex items-center gap-1">
              <CheckCircle2 size={10} /> Đã ký
            </span>
          )}
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-[11px]">
          <button
            onClick={() => setMode("direct")}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${
              mode === "direct" ? "bg-orange-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Smartphone size={11} /> Trực tiếp
          </button>
          <button
            onClick={() => setMode("qr")}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition-colors ${
              mode === "qr" ? "bg-orange-500 text-white" : "bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Monitor size={11} /> Qua QR
          </button>
        </div>
      </div>

      {/* TH1 — Direct canvas */}
      {mode === "direct" && (
        <div className="flex flex-col gap-2">
          {value ? (
            <div className="flex flex-col gap-2">
              <div className="rounded-xl border-2 border-green-300 overflow-hidden bg-white">
                <img src={value} alt="Chữ ký" className="w-full h-36 object-contain" />
              </div>
              <button
                onClick={handleReset}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:border-red-300 hover:text-red-500 transition-colors"
              >
                <RefreshCw size={11} /> Ký lại
              </button>
            </div>
          ) : (
            <SignatureCanvas
              ref={sigCanvasRef}
              height={160}
              onEnd={(data) => { if (data) onChange(data); }}
              showResetButton
            />
          )}
          <p className="text-[11px] text-gray-400 italic">Khách hàng ký trực tiếp vào ô trên, sau đó tester nhấn Lưu.</p>
        </div>
      )}

      {/* TH2 — QR code */}
      {mode === "qr" && (
        <div className="flex flex-col gap-3">
          {!value ? (
            <>
              <div className="flex gap-4 items-start">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-3 shrink-0">
                  <QRCodeSVG value={qrUrl || "https://example.com"} size={128} level="M" />
                </div>
                <div className="flex flex-col gap-2 text-xs text-gray-600">
                  <p className="font-semibold text-gray-700">Hướng dẫn:</p>
                  <ol className="flex flex-col gap-1.5 text-gray-500">
                    {["Khách hàng dùng điện thoại quét mã QR", "Ký vào ô trên điện thoại và nhấn \"Xác nhận\"", "Chữ ký sẽ tự cập nhật tại đây"].map((txt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-[10px] font-bold">{i + 1}</span>
                        {txt}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 italic break-all">
                Link: <a href={qrUrl} target="_blank" rel="noreferrer" className="text-orange-500 underline">{qrUrl}</a>
              </p>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-green-600 text-xs font-semibold">
                <CheckCircle2 size={14} /> Đã nhận chữ ký từ khách hàng!
              </div>
              <div className="rounded-xl border-2 border-green-300 overflow-hidden bg-white">
                <img src={value} alt="Chữ ký" className="w-full h-36 object-contain" />
              </div>
              <button
                onClick={handleReset}
                className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:border-red-300 hover:text-red-500 transition-colors"
              >
                <RefreshCw size={11} /> Yêu cầu ký lại
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
