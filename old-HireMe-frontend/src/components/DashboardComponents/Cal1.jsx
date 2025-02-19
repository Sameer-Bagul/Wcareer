import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Users,
  Link as LinkIcon,
  X,
} from "lucide-react";

// Predefined virtual event types with enhanced styling
const EVENT_TYPES = {
  meeting: {
    name: "Virtual Meeting",
    icon: "💻",
    color: "bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300",
  },
  webinar: {
    name: "Webinar",
    icon: "🎤",
    color: "bg-gradient-to-r from-green-100 to-green-200 border-green-300",
  },
  workshop: {
    name: "Online Workshop",
    icon: "📚",
    color: "bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300",
  },
  conference: {
    name: "Virtual Conference",
    icon: "🌐",
    color: "bg-gradient-to-r from-red-100 to-red-200 border-red-300",
  },
  training: {
    name: "Training Session",
    icon: "🧑‍🏫",
    color: "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300",
  },
  networking: {
    name: "Networking Event",
    icon: "🤝",
    color: "bg-gradient-to-r from-indigo-100 to-indigo-200 border-indigo-300",
  },
};

// Comprehensive virtual events data distributed across December
const VIRTUAL_EVENTS = {
  "2024-12-13": [
    {
      id: 1,
      title: "Intelligent Machining",
      type: "conference",
      startTime: "09:00",
      endTime: "16:00",
      description:
        "Groundbreaking insights into artificial intelligence and machine learning trends",
      speaker: "Dr. Elena Rodriguez",
      platform: "Global Tech Streams",
      difficulty: "All Levels",
      location: "Virtual Global Platform",
      participants: 500,
      registrationLink: "https://example.com/ai-summit",
    },
  ],
  "2024-12-15": [
    {
      id: 2,
      title: "3D CAD Masterclass",
      type: "webinar",
      startTime: "14:00",
      endTime: "15:30",
      description:
        "Advanced strategies for enterprise cybersecurity in the digital age",
      speaker: "Mark Thompson, CISSP",
      platform: "SecureTech Webinars",
      difficulty: "Advanced",
      location: "Secure Online Network",
      participants: 250,
      registrationLink: "https://example.com/cybersecurity-webinar",
    },
  ],
  "2024-12-18": [
    {
      id: 3,
      title: "Computer Graphics",
      type: "webinar",
      startTime: "18:00",
      endTime: "19:30",
      description:
        "Connect with innovative entrepreneurs and venture capitalists",
      speaker: "Sarah Kim, Startup Ecosystem Expert",
      platform: "Entrepreneur Connect",
      difficulty: "All Levels",
      location: "Global Startup Network",
      participants: 300,
      registrationLink: "https://example.com/startup-networking",
    },
  ],
  "2024-12-20": [
    {
      id: 4,
      title: "Programming Workshop",
      type: "workshop",
      startTime: "11:00",
      endTime: "13:00",
      description: "Hands-on workshop on advanced techniques",
      speaker: "Alex Chen, Data Science Lead",
      platform: "Tech Learning Hub",
      difficulty: "Intermediate",
      location: "Online Code Academy",
      participants: 200,
      registrationLink: "https://example.com/python-workshop",
    },
  ],
  "2024-12-22": [
    {
      id: 5,
      title: "Digital Marketing Trends 2025",
      type: "meeting",
      startTime: "10:00",
      endTime: "12:00",
      description:
        "Exploring cutting-edge digital marketing strategies for the upcoming year",
      speaker: "Emily Wong, Marketing Strategist",
      platform: "Marketing Insights Live",
      difficulty: "All Levels",
      location: "Global Marketing Network",
      participants: 350,
      registrationLink: "https://example.com/marketing-trends",
    },
  ],
  "2024-12-27": [
    {
      id: 6,
      title: "Cloud Computing Advanced Training",
      type: "training",
      startTime: "15:00",
      endTime: "17:00",
      description:
        "Deep dive into advanced cloud computing architectures and best practices",
      speaker: "Michael Lee, Cloud Solutions Architect",
      platform: "Tech Pro Training",
      difficulty: "Advanced",
      location: "Cloud Innovation Center",
      participants: 150,
      registrationLink: "https://example.com/cloud-training",
    },
  ],
  "2024-12-30": [
    {
      id: 7,
      title: "Future of Remote Work",
      type: "conference",
      startTime: "13:00",
      endTime: "16:00",
      description:
        "Comprehensive exploration of remote work trends and technologies",
      speaker: "Rachel Green, Workplace Transformation Expert",
      platform: "Future of Work Summit",
      difficulty: "All Levels",
      location: "Global Remote Work Network",
      participants: 400,
      registrationLink: "https://example.com/remote-work-summit",
    },
  ],
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 11, 12)); // December 12, 2024
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11, 12));
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  // Generate calendar days
  const generateCalendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentMonth]);

  // Event Modal Component
  const EventModal = ({ event, onClose }) => {
    const eventTypeInfo = EVENT_TYPES[event.type];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl  shadow-xl max-w-2xl w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <X size={24} />
          </button>

          <div className={`rounded-t-lg p-4 ${eventTypeInfo.color}`}>
            <h2 className="text-2xl font-bold flex items-center">
              <span className="mr-2">{eventTypeInfo.icon}</span>
              {event.title}
            </h2>
          </div>

          <div className="p-4">
            <div className="space-y-3 mb-4">
              <p className="flex items-center">
                <Clock className="mr-2 text-blue-600" size={16} />
                {event.startTime} - {event.endTime}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 text-green-600" size={16} />
                {event.location}
              </p>
              <p className="flex items-center">
                <Users className="mr-2 text-purple-600" size={16} />
                {event.participants} Participants
              </p>
            </div>

            <p className="text-gray-700 italic mb-4">{event.description}</p>

            <div className="flex justify-between items-center">
              <div>
                <strong>Speaker:</strong> {event.speaker}
                <br />
                <strong>Platform:</strong> {event.platform}
              </div>

              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center"
              >
                <LinkIcon className="mr-2" size={16} />
                Link
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 rounded-2xl shadow-2xl overflow-hidden relative">
      {/* Calendar Header */}
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-blue-700 rounded-full transition-colors"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-blue-700 rounded-full transition-colors"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 text-center bg-white">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-gray-600 p-2 bg-gray-100">
            {day}
          </div>
        ))}
        {generateCalendarDays.map((date, index) => (
          <div
            key={index}
            className={`p-2 border cursor-pointer relative 
              ${
                date && date.toDateString() === selectedDate.toDateString()
                  ? "bg-blue-100 font-bold"
                  : ""
              }
              ${date ? "hover:bg-gray-100" : "text-gray-300"}
            `}
            onClick={() => {
              if (date) {
                setSelectedDate(date);
                const formattedDate = date.toISOString().split("T")[0];
                const events = VIRTUAL_EVENTS[formattedDate];
                if (events && events.length > 0) {
                  setSelectedEvent(events[0]); // Open first event if exists
                }
              }
            }}
          >
            {date && date.getDate()}
            {date && VIRTUAL_EVENTS[date.toISOString().split("T")[0]] && (
              <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                <div className="h-1 w-1 bg-red-500 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Calendar;
