import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();

//START -> middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//END -> middlewares

// START -> remove it in production
app.use(morgan("dev"));
// END -> remove it in production

app.use("/api/v1", appRouter);

export default app;
