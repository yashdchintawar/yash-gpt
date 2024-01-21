import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
export const genrateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({
                status: "failed",
                message: "user Not Registered Or Token MalFunctioned",
            });
        // grabbing chats of user
        const chats = user.chats.map(({ role, content }) => ({
            role,
            content,
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        // send all chats with new one to API
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ status: "success", chats: user.chats });
    }
    catch (error) {
        return res
            .status(500)
            .json({
            status: "failed",
            message: "Something Went Wrong",
            error: error,
        });
    }
};
export const sendChatsToUser = async (req, res, next) => {
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
            .json({ status: "success", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({ status: "failed", message: "Error", cause: error.message });
    }
};
export const deleteUserChats = async (req, res, next) => {
    try {
        // user sign in
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("user Not Registered Or Token MalFunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res
            .status(200)
            .json({ status: "success" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(200)
            .json({ status: "failed", message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map