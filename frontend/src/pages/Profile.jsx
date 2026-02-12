// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import QRCodeBox from "../components/QRCodeBox";
// import AttendanceCalendar from "../components/AttendanceCalendar";

// function Profile() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">

//         <h2 className="text-2xl font-bold mb-4 text-center">
//           User Profile
//         </h2>

//         <div className="space-y-2 text-gray-700">
//           <p><strong>User ID:</strong> {user.user_id}</p>
//           <p>
//             <strong>Role:</strong>{" "}
//             {user.is_admin ? (
//               <span className="text-green-600 font-semibold">
//                 Admin
//               </span>
//             ) : (
//               <span className="text-blue-600 font-semibold">
//                 User
//               </span>
//             )}
//           </p>
//         </div>

//         <button
//           onClick={logout}
//           className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>

//         <div className="mt-6">
//           <QRCodeBox />
//         </div>

//         <div className="mt-6">
//           <AttendanceCalendar />
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Profile;

// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import QRCodeBox from "../components/QRCodeBox";

// function Profile() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-6">

//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center">

//         {/* Avatar */}
//         <div className="w-24 h-24 mx-auto rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
//           {user.user_id}
//         </div>

//         <h2 className="text-2xl font-bold mt-4">
//           User Profile
//         </h2>

//         <p className="text-gray-500 mt-1">
//           {user.is_admin ? "Administrator" : "Regular User"}
//         </p>

//         {/* Options Card */}
//         <div className="mt-6 bg-gray-50 rounded-xl p-4 shadow-inner">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-gray-600">User ID</span>
//             <span className="font-semibold">{user.user_id}</span>
//           </div>

//           <div className="flex justify-between items-center">
//             <span className="text-gray-600">Role</span>
//             <span className={`font-semibold ${user.is_admin ? "text-green-600" : "text-blue-600"}`}>
//               {user.is_admin ? "Admin" : "User"}
//             </span>
//           </div>
//         </div>

//         {/* QR Section */}
//         <div className="mt-6">
//           <QRCodeBox />
//         </div>

//         <button
//           onClick={logout}
//           className="mt-6 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
//         >
//           Logout
//         </button>

//       </div>
//     </div>
//   );
// }

// export default Profile;


import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import QRCodeBox from "../components/QRCodeBox";
import AttendanceCalendar from "../components/AttendanceCalendar";
import { QrCode, User } from "lucide-react";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="h-full flex flex-col md:flex-row gap-6">
        
        {/* LEFT SIDE - PROFILE / QR CARD */}
        <div className="md:w-1/2 w-full h-full bg-white rounded-3xl shadow-2xl p-8 relative flex flex-col justify-center">

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
                {user.user_id}
              </div>

              <h2 className="text-2xl font-bold mt-6 text-center">
                Welcome Back
              </h2>

              <p className="text-gray-500 text-center mt-1">
                {user.is_admin ? "Administrator Account" : "User Account"}
              </p>

              <div className="mt-6 bg-gray-50 rounded-xl p-4 shadow-inner space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID</span>
                  <span className="font-semibold">{user.user_id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Role</span>
                  <span className={`font-semibold ${user.is_admin ? "text-green-600" : "text-blue-600"}`}>
                    {user.is_admin ? "Admin" : "User"}
                  </span>
                </div>
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