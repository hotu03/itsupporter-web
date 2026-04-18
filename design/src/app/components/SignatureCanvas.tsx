import {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import { RotateCcw } from "lucide-react";

export interface SignatureCanvasHandle {
  reset: () => void;
  complete: () => void;
  isEmpty: () => boolean;
  toDataURL: () => string;
}

interface Props {
  initialData?: string;
  onEnd?: (data: string) => void;
  disabled?: boolean;
  className?: string;
  height?: number;
  showResetButton?: boolean;
  showCompleteButton?: boolean;
  label?: string;
}

export const SignatureCanvas = forwardRef<SignatureCanvasHandle, Props>(
  (
    {
      initialData,
      onEnd,
      disabled = false,
      className = "",
      height = 160,
      showResetButton = true,
      showCompleteButton = true,
      label,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const hasDrawn = useRef(false); // track if any stroke was drawn
    const onEndTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [hasData, setHasData] = useState(false);

    // Setup / resize canvas preserving existing content
    const setupCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Save existing pixels before resize
      const snapshot = canvas.toDataURL("image/png");
      const hadContent = hasData || hasDrawn.current;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Darker stroke for better visibility on mobile
      ctx.strokeStyle = "#0f172a";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (initialData && !hadContent) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
          setHasData(true);
          hasDrawn.current = true;
        };
        img.src = initialData;
      } else if (hadContent) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        img.src = snapshot;
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      setupCanvas();
      // If initialData arrives later (e.g. from QR sync)
      if (initialData) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, rect.width, rect.height);
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
          setHasData(true);
        };
        img.src = initialData;
      }
    }, [initialData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      window.addEventListener("resize", setupCanvas);
      return () => {
        window.removeEventListener("resize", setupCanvas);
        if (onEndTimeout.current) clearTimeout(onEndTimeout.current);
      };
    }, [setupCanvas]);

    // ── Pointer helpers ────────────────────────────────────────
    const getPos = (e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      return {
        x: (e as MouseEvent).clientX - rect.left,
        y: (e as MouseEvent).clientY - rect.top,
      };
    };

    const startDrawing = useCallback(
      (e: MouseEvent | TouchEvent) => {
        if (disabled) return;
        e.preventDefault();
        isDrawing.current = true;
        hasDrawn.current = true;
        const pos = getPos(e);
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      },
      [disabled]
    );

    const draw = useCallback(
      (e: MouseEvent | TouchEvent) => {
        if (!isDrawing.current || disabled) return;
        e.preventDefault();
        const pos = getPos(e);
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      },
      [disabled]
    );

    const stopDrawing = useCallback(() => {
      if (!isDrawing.current) return;
      isDrawing.current = false;
      setHasData(true);
      // Do NOT call onEnd here - only via complete() button
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseleave", stopDrawing);

      canvas.addEventListener("touchstart", startDrawing, { passive: false });
      canvas.addEventListener("touchmove", draw, { passive: false });
      canvas.addEventListener("touchend", stopDrawing);

      return () => {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseleave", stopDrawing);
        canvas.removeEventListener("touchstart", startDrawing);
        canvas.removeEventListener("touchmove", draw);
        canvas.removeEventListener("touchend", stopDrawing);
      };
    }, [startDrawing, draw, stopDrawing]);

    const reset = useCallback(() => {
      if (onEndTimeout.current) clearTimeout(onEndTimeout.current);
      hasDrawn.current = false;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasData(false);
      onEnd?.("");
    }, [onEnd]);

    useImperativeHandle(ref, () => ({
      reset,
      complete: () => {
        if (onEndTimeout.current) clearTimeout(onEndTimeout.current);
        const canvas = canvasRef.current;
        if (canvas && hasData) onEnd?.(canvas.toDataURL("image/png"));
      },
      isEmpty: () => !hasData,
      toDataURL: () => canvasRef.current?.toDataURL("image/png") ?? "",
    }));

    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && (
          <label className="text-xs font-medium text-gray-600">{label}</label>
        )}

        <div className="relative">
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: `${height}px`,
              display: "block",
              touchAction: "none",
              cursor: disabled ? "not-allowed" : "crosshair",
              pointerEvents: disabled ? "none" : "auto",
              opacity: disabled ? 0.6 : 1,
            }}
            className={`border-2 rounded-xl bg-white transition-all duration-200 ${
              disabled
                ? "border-gray-300"
                : hasData
                ? "border-orange-400 shadow-sm"
                : "border-dashed border-gray-300 hover:border-orange-300"
            }`}
          />
        </div>

        {showResetButton && !disabled && hasData && (
          <div className="flex items-center gap-2">
            {showCompleteButton && (
              <button
                type="button"
                onClick={() => {
                  if (onEndTimeout.current) clearTimeout(onEndTimeout.current);
                  const canvas = canvasRef.current;
                  if (canvas) onEnd?.(canvas.toDataURL("image/png"));
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-orange-500 text-white text-xs font-medium hover:bg-orange-600 active:scale-95 transition-all shadow-sm"
              >
                Hoàn thành chữ ký
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-xs font-medium hover:border-red-300 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all shadow-sm"
            >
              <RotateCcw size={14} />
              Ký lại
            </button>
          </div>
        )}
      </div>
    );
  }
);
SignatureCanvas.displayName = "SignatureCanvas";
