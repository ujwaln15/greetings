import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

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
