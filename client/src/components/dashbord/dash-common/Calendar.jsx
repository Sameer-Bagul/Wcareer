import { useState } from "react";
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  addDays, subMonths, addMonths, isToday, isSameMonth, isSameDay 
} from "date-fns";

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const days = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="flex flex-col items-center p-6 bg-[#F8F7F3] rounded-lg shadow-md shadow-[#bfbcb2]">
      <div className="w-full max-w-md p-4 rounded-2xl">
   
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
            className="px-2 py-1 text-lg hover:bg-gray-200 rounded"
          >
            &#9664;
          </button>
          <h2 className="text-lg font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} 
            className="px-2 py-1 text-lg hover:bg-gray-200 rounded"
          >
            &#9654;
          </button>
        </div>

       
        <div className="grid grid-cols-7 text-center text-sm font-bold">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <button
              key={index}
              className={`p-2 rounded-full transition duration-200 text-sm 
                ${isSameMonth(day, currentMonth) ? "text-black" : "text-gray-400"} 
[                ${isToday(day) ? "bg-yellow-500 text-white" : ""} 
]                ${selectedDate && isSameDay(day, selectedDate) ? "bg-black text-white" : "hover:bg-gray-200"}`}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, "d")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
