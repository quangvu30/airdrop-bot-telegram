const { UserModel } = require("../models/user");

const insertUser = async (user) => {
  try {
    const userInstance = await UserModel.create(user);
    return userInstance;
  } catch (error) {
    return error;
  }
};

const getUser = async (id) => {
  try {
    const user = await UserModel.findOne({ id: id });
    if (!user) return null;
    return user;
  } catch (error) {
    return error;
  }
};

const updateUser = async (id, data) => {
  try {
    const user = await UserModel.findOneAndUpdate(
      { id: id },
      { $set: data },
      { upsert: true }
    );
    return user;
  } catch (error) {
    return error;
  }
};

module.exports = {
  insertUser,
  getUser,
  updateUser,
};
