import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { renameSync, unlinkSync } from "fs";

const tokenMaxAge = 2 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: tokenMaxAge,
  });
};

export const signUp = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).send("Email is required.");
    } else if (!password) {
      return response.status(400).send("Password is required.");
    }
    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return response.status(409).send("User with given email already exists");
    }
    const user = await User.create({ email, password });
    response.cookie("jwt", createToken(email, user.id), {
      tokenMaxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileComplete: user.profileComplete,
      },
    });
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email) {
      return response.status(400).send("Email is required.");
    } else if (!password) {
      return response.status(400).send("Password is required.");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return response.status(404).send("User with given email not found");
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return response.status(400).send("Password is incorrect");
    }
    response.cookie("jwt", createToken(email, user.id), {
      tokenMaxAge,
      secure: true,
      sameSite: "None",
    });
    return response.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileComplete: user.profileComplete,
        firstName: user.firstName,
        lastName: user.lastName,
        theme: user.theme,
        dp: user.dp,
      },
    });
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};

export const getUserInfo = async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);
    if (!user) {
      return response.status(404).send("User with given id not found");
    }
    return response.status(200).json({
      id: user.id,
      email: user.email,
      profileComplete: user.profileComplete,
      firstName: user.firstName,
      lastName: user.lastName,
      theme: user.theme,
      dp: user.dp,
    });
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};

export const updateProfile = async (request, response, next) => {
  try {
    const { userId } = request;
    const { firstName, lastName, theme } = request.body;
    if (!firstName || !lastName) {
      return response
        .status(400)
        .send("First name and last name are required.");
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        theme,
        profileComplete: true,
      },
      { new: true, runValidators: true }
    );
    return response.status(200).json({
      id: user.id,
      email: user.email,
      profileComplete: user.profileComplete,
      firstName: user.firstName,
      lastName: user.lastName,
      theme: user.theme,
      dp: user.dp,
    });
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};

export const addDp = async (request, response, next) => {
  try {
    if (!request.file) {
      return response.status(400).send("File is required.");
    }

    const date = Date.now();
    let fileName = "uploads/dps/" + date + request.file.originalname;
    renameSync(request.file.path, fileName);

    const updatedUser = await User.findByIdAndUpdate(
      request.userId,
      { dp: fileName },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      dp: updatedUser.dp,
    });
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};

export const removeDp = async (request, response, next) => {
  try {
    const { userId } = request;
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).send("User not found.");
    }

    if (user.dp) {
      unlinkSync(user.dp);
    }

    user.dp = null;
    await user.save();

    return response.status(200).send("dp removed successfully");
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};

export const logOut = async (request, response, next) => {
  try {
    response.cookie("jwt", "", {
      tokenMaxAge: 1,
      secure: true,
      sameSite: "None",
    });
    return response.status(200).send("Logout successful");
  } catch (err) {
    console.log({ err });
    return response.status(500).send("Internal Server Error");
  }
};
