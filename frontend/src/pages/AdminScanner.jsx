import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import http from "../api/http";

function AdminScanner() {
  const scannerRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          async (decodedText) => {
            try {
              setMessage("Processing...");

              const res = await http.post("/attendance/scan", {
                token: decodedText,
              });

              setMessage(res.data.message);
            } catch (err) {
              setMessage(
                err.response?.data?.error || "Scan failed"
              );
            }
          },
          (errorMessage) => {
            // ignore scan frame errors
          }
        );
      } catch (err) {
        console.error("Scanner failed to start:", err);
        setMessage("Camera failed to start");
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        try {
          if (scannerRef.current.getState && scannerRef.current.getState() === 2) {
            scannerRef.current.stop();
          }
        } catch (e) {
          // ignore stop errors if scanner was not running
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">

        <h2 className="text-2xl font-bold mb-4">
          Admin QR Scanner
        </h2>

        <div
          id="reader"
          className="w-full h-80 border rounded-lg overflow-hidden"
        ></div>

        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminScanner;