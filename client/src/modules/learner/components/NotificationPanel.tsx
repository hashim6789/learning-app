import React, { useState } from "react";
import { Bell } from "lucide-react";

const NotificationPanel = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setShowNotification(!showNotification)}
        className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
      </button>

      {/* Notification Panel */}
      {showNotification && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 font-medium mb-2">No notifications</p>
              {/* <p className="text-gray-500 text-sm">
                We'll let you know when deadlines are approaching,
                <br />
                or there is a course update
              </p> */}
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification, index) => (
                <div key={index} className="p-4 border-b border-gray-200">
                  {notification}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
