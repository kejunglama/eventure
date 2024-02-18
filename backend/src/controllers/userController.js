import { User } from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { name, username } = req.body;
  console.log(req.body);
  if (!name || !username) {
    return res
      .status(400)
      .send({ message: "Send all required fields: name, username" });
  }
  try {
    const user = await User.create({ name, username });
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      user.password = undefined;
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.username = req.body.username || user.username;
      user.password = req.body.password || user.password;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
