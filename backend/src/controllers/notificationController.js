import { Notification } from "../models/notificationModel.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      users: req.params.id,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  const { title, date, type, users } = req.body;
  try {
    const savedNotification = await Notification.create({
      title,
      date,
      type,
      users,
    });
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
};

export const updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { read: req.body.read },
      { new: true }
    );
    console.log(updatedNotification);
    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
