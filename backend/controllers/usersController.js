const UserModel = require("../models/users");

// Create and Save a new user
exports.create = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.phone ||
      !req.body.password

    ) {
      return res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new UserModel({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      password: req.body.password,

    });

    const data = await user.save();
    res.send({
      message: "User created successfully!!",
      user: data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating user",
    });
  }
};

/**
 * Retrieves all users from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the result.
 */
exports.findAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty!" });
  }

  const id = req.params.id;

  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true, useFindAndModify: false });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.send({ message: "User updated successfully.", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    res.send({ message: "User deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};