

import { useEffect, useState } from "react";
import http from "../api/http";

function QRCodeBox() {
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQr = async () => {
    try {
      setLoading(true);
      const res = await http.get("/qr/generate");
      setQrImage(res.data.qr_image_base64);
      setError("");
    } catch (err) {
      setError("Failed to load QR code");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQr();
  }, []);

  return (
    <div className="mt-6 text-center">
      <h3 className="text-lg font-semibold mb-3">
        Your QR Code
      </h3>

      {loading && (
        <p className="text-gray-500 text-sm">Generating QR...</p>
      )}

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      {qrImage && (
        <div className="flex justify-center">
          <img
            src={`data:image/png;base64,${qrImage}`}
            alt="User QR Code"
            className="rounded-lg shadow-md"
            width="200"
          />
        </div>
      )}

      <button
        onClick={fetchQr}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Refresh QR
      </button>
    </div>
  );
}

export default QRCodeBox;