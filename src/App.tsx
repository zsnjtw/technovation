import React, { useState, useEffect } from 'react';
import {
  Bell,
  Book,
  Calendar,
  Clock,
  MessageCircle,
  Search,
  User,
  Video,
  X,
  Timer,
  Play,
  Pause,
  StopCircle,
} from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  subject: string;
  avatar: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  type: 'test' | 'homework' | 'event';
  duration?: number; // Duration in minutes
  timeSpent?: number; // Time spent in seconds
  isTracking?: boolean;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "History UC Exam",
      date: "March 15, 2024",
      type: "test",
    },
    {
      id: 2,
      title: "Math Assignment Due",
      date: "March 18, 2024",
      type: "homework",
      duration: 120, // 2 hours
      timeSpent: 0,
      isTracking: false,
    },
    {
      id: 3,
      title: "Science Fair",
      date: "March 20, 2024",
      type: "event",
    },
    {
      id: 4,
      title: "Physics Problem Set",
      date: "March 19, 2024",
      type: "homework",
      duration: 90, // 1.5 hours
      timeSpent: 0,
      isTracking: false,
    },
  ]);
  
  const teachers: Teacher[] = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      subject: "Mathematics",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subject: "Physics",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    },
    {
      id: 3,
      name: "Ms. Emily Brown",
      subject: "History",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },{
      id: 4,
      name: "Zarina",
      subject: "Mathematics",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event.isTracking 
            ? { ...event, timeSpent: (event.timeSpent || 0) + 1 }
            : event
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (eventId: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, isTracking: !event.isTracking }
          : event
      )
    );
  };

  const resetTimer = (eventId: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId
          ? { ...event, timeSpent: 0, isTracking: false }
          : event
      )
    );
  };

  const getProgressColor = (timeSpent: number = 0, duration: number = 0) => {
    const progress = (timeSpent / 60) / duration;
    if (progress < 0.5) return 'text-green-600';
    if (progress < 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">EduPortal</h1>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
              <User className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">Welcome back, Student!</h2>
          <p className="text-gray-600">Here's what's happening today</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search for lessons, assignments, or teachers..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div className="flex-grow">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                    {event.type === 'homework' && (
                      <div className="mt-1">
                        <div className="flex items-center space-x-2">
                          <Timer className={`w-4 h-4 ${getProgressColor(event.timeSpent, event.duration)}`} />
                          <span className="text-sm text-gray-600">
                            {formatTime(event.timeSpent || 0)} / {event.duration}min
                          </span>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => toggleTimer(event.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {event.isTracking ? (
                                <Pause className="w-4 h-4 text-yellow-600" />
                              ) : (
                                <Play className="w-4 h-4 text-green-600" />
                              )}
                            </button>
                            <button
                              onClick={() => resetTimer(event.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <StopCircle className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                        <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                          <div
                            className={`h-full rounded-full ${
                              getProgressColor(event.timeSpent, event.duration).replace('text-', 'bg-')
                            }`}
                            style={{
                              width: `${Math.min(
                                ((event.timeSpent || 0) / 60 / (event.duration || 1)) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                <Book className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600">Homework</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg hover:bg-green-100">
                <Video className="w-5 h-5 text-green-600" />
                <span className="text-green-600">Video Lessons</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg hover:bg-purple-100">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="text-purple-600">Schedule</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-pink-50 rounded-lg hover:bg-pink-100">
                <MessageCircle className="w-5 h-5 text-pink-600" />
                <span className="text-pink-600">Messages</span>
              </button>
            </div>
          </div>

          {/* Teachers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Available Teachers</h3>
            <div className="space-y-4">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center space-x-3">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{teacher.name}</p>
                    <p className="text-sm text-gray-500">{teacher.subject}</p>
                  </div>
                  <button className="ml-auto p-2 text-blue-600 hover:bg-blue-50 rounded-full">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Reminders</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800">Math homework due tomorrow</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800">History test next week</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;