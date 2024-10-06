import mongoose from "mongoose";
import Gathering from "../models/GatheringModel.js";
import User from "../models/UserModel.js";

export const createGathering = async (request, response, next) => {
  try {
    const { name, members } = request.body;
    const userId = request.userId;

    const admin = await User.findById(userId);

    if (!admin) {
      return response.status(400).send("Admin user not found.");
    }

    const validMembers = await User.find({ _id: { $in: members } });

    if (validMembers.length !== members.length) {
      return response.status(400).send("Some members are not valid users.");
    }

    const newGathering = new Gathering({
      name,
      members,
      admin: userId,
    });
    await newGathering.save();

    return response.status(201).json({ gathering: newGathering });
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};

export const getUserGatherings = async (request, response, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(request.userId);
    const gatherings = await Gathering.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updatedAt: -1 });
    return response.status(200).json({ gatherings: gatherings });
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};
