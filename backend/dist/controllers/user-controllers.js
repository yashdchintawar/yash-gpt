import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        // getting all users
        const users = await User.find();
        return res.status(200).json({ message: "ok", users });
    }
    catch (error) {
        console.error(error);
        return res.status(200).json({ message: "Error", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        // creating user sign up
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("user already exists!");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // START -> Create Token & Store Cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "5d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 5);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        // END -> Create Token & Store Cookie
        return res
            .status(201)
            .json({ status: "success", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ status: "failed", message: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        // creating user sign in
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("user Not Registered!");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send("Incorrect Password");
        }
        // START -> Create Token & Store Cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "5d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 5);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        // END -> Create Token & Store Cookie
        return res
            .status(200)
            .json({ status: "success", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ status: "failed", message: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        // user sign in
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("user Not Registered Or Token MalFunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        return res
            .status(200)
            .json({ status: "success", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({ status: "failed", message: "Error", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        // user sign in
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("user Not Registered Or Token MalFunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res
            .status(200)
            .json({ status: "success", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({ status: "failed", message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map