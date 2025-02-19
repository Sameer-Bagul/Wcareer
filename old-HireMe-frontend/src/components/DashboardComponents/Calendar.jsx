import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./Calendar.css";

const Calendar = () => {
  return (
    <div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          header
          Toolbar={{
            left: "prev, next today",
            center: "title",
            right: "dayGridMonth, timeGridWeek, timeGridDay",
          }}
          allDaySlot={false}
          initialView="timeGridWeek"
          slotDuration={"01:00:00"}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          initialEvents={[]}
        />
      </div>
    </div>
  );
};

export default Calendar;
