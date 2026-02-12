import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import QRCodeBox from "../components/QRCodeBox";
import AttendanceCalendar from "../components/AttendanceCalendar";
import { QrCode, User, Camera } from "lucide-react";
import http from "../api/http"

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [showQR, setShowQR] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await http.get("/profile");
        setProfileData(res.data);
      } catch (err) {
        setProfileData(null);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="h-full flex flex-col md:flex-row gap-6">

        {/* LEFT SIDE - PROFILE / QR CARD */}
        <div className="md:w-1/2 w-full h-full bg-white rounded-3xl shadow-2xl p-8 relative flex flex-col justify-center">

          {user.is_admin && (
            <button
              onClick={() => window.location.href = "/scanner"}
              className="absolute top-6 left-6 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition"
            >
              <Camera size={20} />
            </button>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setShowQR(!showQR)}
            className="absolute top-6 right-6 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
          >
            {showQR ? <User size={20} /> : <QrCode size={20} />}
          </button>

          {!showQR ? (
            <>
              <div className="w-24 h-24 mx-auto rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {profileData?.photo_url && (
                  <img
                    src={profileData.photo_url}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
              </div>

              <h2 className="text-2xl font-bold mt-6 text-center">
                Welcome Back, {profileData?.name || "User"}
              </h2>

              <p className="text-gray-500 text-center mt-1">
                {user.is_admin ? "Administrator Account" : "User Account"}
              </p>

              <div className="mt-6 bg-gray-50 rounded-xl p-4 shadow-inner space-y-3">

                <div className="flex justify-between">
                  <span className="text-gray-600">Role</span>
                  <span className={`font-semibold ${user.is_admin ? "text-green-600" : "text-blue-600"}`}>
                    {user.is_admin ? "Admin" : "User"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">User ID</span>
                  <span className="font-semibold">{user.user_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone no.</span>
                  <span className="font-semibold">{profileData?.email}</span>
                </div>



                <button
                  onClick={() => window.location.href = "/edit-profile"}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Edit Profile
                </button>
              </div>

              <button
                onClick={logout}
                className="mt-8 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-xl font-bold mb-6">Your QR Code</h3>
              <QRCodeBox />
            </div>
          )}
        </div>

        {/* RIGHT SIDE - CALENDAR */}
        <div className="md:w-1/2 w-full h-full bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
          <h3 className="text-xl font-bold text-center mb-6">
            Monthly Attendance
          </h3>
          <AttendanceCalendar />
        </div>

      </div>
    </div>
  );
}

export default Profile;