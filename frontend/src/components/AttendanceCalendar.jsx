

// import { useEffect, useState } from "react";
// import http from "../api/http";

// function AttendanceCalendar() {
//   const [presentDays, setPresentDays] = useState([]);

//   useEffect(() => {
//     const month = new Date().toISOString().slice(0, 7);

//     http
//       .get(`/attendance/calendar?month=${month}`)
//       .then((res) => {
//         setPresentDays(res.data.present_days);
//       })
//       .catch(() => {
//         console.log("Failed to load attendance data");
//       });
//   }, []);

//   return (
//     <div className="mt-6">
//       <h3 className="text-lg font-semibold mb-3">
//         Attendance This Month
//       </h3>

//       {presentDays.length === 0 ? (
//         <p className="text-gray-500 text-sm">
//           No attendance recorded yet.
//         </p>
//       ) : (
//         <ul className="space-y-1 text-sm">
//           {presentDays.map((day, index) => (
//             <li
//               key={index}
//               className="bg-green-100 text-green-700 px-3 py-1 rounded-md"
//             >
//               {day}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AttendanceCalendar;

import { useEffect, useState } from "react";
import http from "../api/http";

function AttendanceCalendar() {
  const [presentDays, setPresentDays] = useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  useEffect(() => {
    const monthStr = today.toISOString().slice(0, 7);

    http
      .get(`/attendance/calendar?month=${monthStr}`)
      .then((res) => {
        setPresentDays(res.data.present_days);
      })
      .catch(() => {
        console.log("Failed to load attendance");
      });
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getDateString = (day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-center">
        Monthly Attendance
      </h3>

      <div className="grid grid-cols-7 gap-2 text-center">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const dateStr = getDateString(day);
          const isPresent = presentDays.includes(dateStr);

          return (
            <div
              key={day}
              className={`p-2 rounded-lg text-sm font-medium
                ${isPresent ? "bg-green-500 text-white" : "bg-red-100 text-gray-600"}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AttendanceCalendar;