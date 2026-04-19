import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SignatureCanvas, SignatureCanvasHandle } from "../components/SignatureCanvas";
import { CheckCircle2, AlertCircle, RefreshCw, Package, Clock, CreditCard } from "lucide-react";
import { getFirestoreMachineById } from "../data/firestoreMachines";
import type { Machine } from "../data/machines";

const SESSION_USED_PREFIX = "its_session_used_";
const DATABASE_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL as string;
const DATABASE_NS = import.meta.env.VITE_FIREBASE_DATABASE_NS as string;
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY as string;

const dbUrl = (path: string) =>
  `${DATABASE_URL}/${path}.json?ns=${DATABASE_NS}&key=${API_KEY}`;

export default function SignPage() {
  const [params] = useSearchParams();
  const session = params.get("session") ?? "";
  const machineIdParam = params.get("machineId");
  const customerName = params.get("name") ? decodeURIComponent(params.get("name")!) : "";

  const canvasRef = useRef<SignatureCanvasHandle>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sigData, setSigData] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [machine, setMachine] = useState<Machine | null>(null);

  // Firebase REST API helper functions
  const checkSession = async (): Promise<boolean> => {
    try {
      const response = await fetch(dbUrl(`sessions/${session}`), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) return false;
      const data = await response.json();
      return data !== null;
    } catch {
      return false;
    }
  };

  const writeSignature = async (sig: string): Promise<boolean> => {
    try {
      // Write signature
      const sigResponse = await fetch(dbUrl(`signatures/${session}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signature: sig, timestamp: Date.now() }),
      });
      if (!sigResponse.ok) return false;

      // Mark session as used
      const sessionResponse = await fetch(dbUrl(`sessions/${session}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ used: true, timestamp: Date.now() }),
      });
      if (!sessionResponse.ok) return false;

      return true;
    } catch {
      return false;
    }
  };

  // Fetch machine info from Firestore
  useEffect(() => {
    if (!machineIdParam) return;

    async function fetchMachine() {
      try {
        const machineData = await getFirestoreMachineById(machineIdParam!);
        if (machineData) {
          setMachine(machineData);
        }
      } catch (error) {
        console.error("Failed to fetch machine:", error);
      }
    }

    fetchMachine();
  }, [machineIdParam]);

  // Check if session already used (one-time use) via Firebase REST
  useEffect(() => {
    if (!session) {
      setCheckingSession(false);
      return;
    }

    // Check localStorage first (instant, no network needed)
    const usedLocal = localStorage.getItem(SESSION_USED_PREFIX + session);
    if (usedLocal) {
      setSessionExpired(true);
      setCheckingSession(false);
      return;
    }

    // Check Firebase REST API
    checkSession().then((expired) => {
      if (expired) {
        setSessionExpired(true);
      }
      setCheckingSession(false);
    });
  }, [session]);

  const handleSave = async () => {
    if (!session) return;
    if (!sigData || canvasRef.current?.isEmpty()) {
      return;
    }

    // Mark locally first
    localStorage.setItem(SESSION_USED_PREFIX + session, "1");

    // Write to Firebase via REST API
    const success = await writeSignature(sigData);

    if (success) {
      setSubmitted(true);
      setSessionExpired(true);
    } else {
      // If Firebase fails, still allow submission (localStorage marked)
      setSubmitted(true);
      setSessionExpired(true);
    }
  };

  // Format date for display
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "—";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-2xl border border-gray-200 p-8 max-w-sm shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <p className="text-sm text-gray-700 font-medium mb-2">Link không hợp lệ</p>
          <p className="text-xs text-gray-500">Vui lòng quét lại mã QR từ màn hình máy tính</p>
        </div>
      </div>
    );
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-2xl border border-gray-200 p-8 max-w-sm shadow-sm">
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4 animate-spin">
            <RefreshCw size={32} className="text-orange-500" />
          </div>
          <p className="text-sm text-gray-700 font-medium mb-2">Đang kiểm tra phiên...</p>
        </div>
      </div>
    );
  }

  if (sessionExpired && !submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-2xl border border-gray-200 p-8 max-w-sm shadow-sm">
          <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-orange-500" />
          </div>
          <p className="text-sm text-gray-700 font-medium mb-2">Phiên đã hết hạn</p>
          <p className="text-xs text-gray-500">Link này đã được sử dụng. Vui lòng yêu cầu tạo mã QR mới nếu cần.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-5 py-4">
        <p className="text-gray-900 font-semibold text-base">CLB IT Supporter</p>
        <p className="text-gray-500 text-xs mt-0.5">Xác nhận tình trạng máy</p>
      </div>

      <div className="flex-1 px-4 py-6 flex flex-col gap-5 max-w-lg mx-auto w-full">
        {!submitted ? (
          <>
            {/* Machine info card - show when available */}
            {machine ? (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} className="text-orange-500" />
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Thông tin máy</p>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <span className="text-gray-400">Khách hàng: </span>
                    <span className="text-gray-800 font-medium">{machine.customerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">SĐT: </span>
                    <span className="text-gray-800 font-medium">{machine.phone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Dịch vụ: </span>
                    <span className="text-gray-800 font-medium">{machine.description || "—"}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Tình trạng: </span>
                    <span className="text-gray-800 font-medium">{machine.machineCondition || "—"}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Bảo hành: </span>
                    <span className="text-gray-800 font-medium">
                      {machine.warranty === "con" ? "Còn bảo hành" : "Hết bảo hành"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Mang sạc: </span>
                    <span className="text-gray-800 font-medium">{machine.charger ? "Có" : "Không"}</span>
                  </div>
                  {machine.dropOffTime && (
                    <div className="col-span-2 flex items-center gap-1">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-gray-400">Đưa máy: </span>
                      <span className="text-gray-800 font-medium">{formatDate(machine.dropOffTime)}</span>
                    </div>
                  )}
                  {machine.appointmentTime && (
                    <div className="col-span-2 flex items-center gap-1">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-gray-400">Hẹn trả: </span>
                      <span className="text-gray-800 font-medium">{formatDate(machine.appointmentTime)}</span>
                    </div>
                  )}
                </div>
                {machine.needs && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-gray-400 text-xs">Nhu cầu: </span>
                    <span className="text-gray-700 text-xs">{machine.needs}</span>
                  </div>
                )}
                {machine.finalAmount !== undefined && machine.finalAmount > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <CreditCard size={12} className="text-gray-400" />
                      <span className="text-gray-400 text-xs">Tổng tiền:</span>
                    </div>
                    <span className="text-orange-600 font-semibold text-sm">{formatCurrency(machine.finalAmount)}</span>
                  </div>
                )}
              </div>
            ) : (
              // Fallback: show customer name from URL params
              customerName && (
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <p className="text-xs text-gray-400 mb-1">Khách hàng</p>
                  <p className="text-sm text-gray-900 font-medium">{customerName}</p>
                </div>
              )
            )}

            {/* Instructions */}
            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Bằng chữ ký này, bạn xác nhận đã kiểm tra và đồng ý với tình trạng máy trước khi bàn giao cho CLB IT Supporter sửa chữa.
              </p>
            </div>

            {/* Signature area */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-xs text-gray-400 text-center mb-4">Ký vào đây</p>

              <SignatureCanvas
                ref={canvasRef}
                height={200}
                onEnd={setSigData}
                showResetButton
                disabled={submitted}
              />
            </div>

            <button
              onClick={handleSave}
              disabled={!sigData}
              className="w-full py-4 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-sm"
            >
              {sigData ? "Xác nhận & Gửi chữ ký" : "Vui lòng ký trước khi tiếp tục"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-5 bg-white rounded-2xl border border-gray-200 p-8 mt-8">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-base font-semibold text-gray-900">Đã hoàn tất</p>
              <p className="text-sm text-gray-600">
                Chữ ký đã được gửi thành công
              </p>
              <p className="text-xs text-gray-400 mt-3">
                Tester sẽ xem và hoàn tất phiếu trên máy tính.<br />
                Bạn có thể đóng trang này.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-4 px-6 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          © 2026 CLB IT Supporter
        </p>
      </div>
    </div>
  );
}