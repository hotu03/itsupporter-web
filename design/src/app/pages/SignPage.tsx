import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SignatureCanvas, SignatureCanvasHandle } from "../components/SignatureCanvas";
import { CheckCircle2, AlertCircle } from "lucide-react";
import penIcon from "../../imports/image-0.png";

const SIG_KEY_PREFIX = "its_sig_";
const SESSION_USED_PREFIX = "its_session_used_";

export default function SignPage() {
  const [params] = useSearchParams();
  const session = params.get("session") ?? "";
  const customerName = params.get("name") ? decodeURIComponent(params.get("name")!) : "";

  const canvasRef = useRef<SignatureCanvasHandle>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sigData, setSigData] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);

  // Check if session already used (one-time use)
  useEffect(() => {
    if (!session) return;
    const used = localStorage.getItem(SESSION_USED_PREFIX + session);
    if (used) {
      setSessionExpired(true);
    }
  }, [session]);

  const handleSave = () => {
    if (!session) return;
    if (!sigData || canvasRef.current?.isEmpty()) {
      return;
    }

    // Mark session as used (one-time only)
    localStorage.setItem(SESSION_USED_PREFIX + session, "1");

    // Save signature data - desktop will receive via storage event
    localStorage.setItem(SIG_KEY_PREFIX + session, sigData);

    setSubmitted(true);
    setSessionExpired(true);
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
            {/* Customer info */}
            {customerName && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-400 mb-2">Khách hàng</p>
                <p className="text-sm text-gray-900 font-medium">{customerName}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-orange-50 rounded-xl border border-orange-200 p-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Bằng chữ ký này, bạn xác nhận đã kiểm tra và đồng ý với tình trạng máy trước khi bàn giao cho CLB IT Supporter sửa chữa.
              </p>
            </div>

            {/* Signature area */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2">
                <img src={penIcon} alt="Ký vào đây" className="w-12 h-12 object-contain opacity-80" />
                <p className="text-xs text-gray-400">Ký vào đây</p>
              </div>

              <SignatureCanvas
                ref={canvasRef}
                height={220}
                onEnd={setSigData}
                showResetButton
              />
            </div>

            <button
              onClick={handleSave}
              disabled={!sigData}
              className="w-full py-4 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all shadow-sm"
            >
              {sigData ? 'Xác nhận & Gửi chữ ký' : 'Vui lòng ký trước khi tiếp tục'}
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
                Tester sẽ xem và hoàn tất phiếu trên máy tính.<br/>
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
