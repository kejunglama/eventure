import { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { fetchNotifications, updateNotificationStatus } from "../services/api";
import { useLocation } from "react-router-dom";

const NotificationModal = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleModal = () => setIsOpen(!isOpen);

  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("id");
  useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        const notifications = await fetchNotifications(userId, token);
        setNotifications(notifications);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotificationsData();
  }, [location]);

  const closeModal = (e) =>
    (e.target.id === "overlay" || e.target.id === "close-button") &&
    setIsOpen(false);

  const handleOnClick = async (id, read) => {
    try {
      console.log("ID:", id, read);
      await updateNotificationStatus(userId, id, { read: read }, token);
      setNotifications(
        notifications.map((notification) =>
          notification._id === id
            ? { ...notification, read: !notification.read }
            : notification
        )
      );
    } catch (error) {
      console.error("Error Updating Notification Status:", error);
    }
  };

  const handleUpdateAllAsRead = async () => {
    try {
      const updatedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          if (!notification.read) {
            await updateNotificationStatus(
              userId,
              notification._id,
              { read: true },
              token
            );
            return { ...notification, read: true };
          }
          return notification;
        })
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error Updating All Notifications:", error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={toggleModal}>Notifications</button>
      </div>

      {isOpen && (
        <div
          id="overlay"
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 ease-in-out"
        >
          <div className="origin-top-right mt-2 w-full max-w-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-black">
                Notifications & Recent Activities
              </h2>
              <button
                id="close-button"
                className="text-gray-500 hover:text-gray-800 text-3xl"
              >
                &times;
              </button>
            </div>

            <div
              className="py-1 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {notifications.map((notification, index) => (
                <a
                  href="#"
                  key={index}
                  className={`block text-sm text-gray-700 ${
                    notification.read
                      ? "hover:bg-gray-100"
                      : "hover:bg-blue-200"
                  } hover:text-gray-900 ${
                    index < notifications.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } ${notification.read ? "bg-white" : "bg-blue-100"}`}
                  role="menuitem"
                >
                  <Notification
                    key={notification.id}
                    notification={notification}
                    handleOnClick={() =>
                      handleOnClick(notification._id, !notification.read)
                    }
                  />
                </a>
              ))}
            </div>
            <div className="flex justify-end items-center border-t border-gray-200 p-4">
              <button
                className="text-blue-500 hover:text-blue-800 text-sm transition duration-300 ease-in-out"
                onClick={handleUpdateAllAsRead}
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
