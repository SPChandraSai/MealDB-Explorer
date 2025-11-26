import express from "express";
import cors from "cors";
import mealsRouter from "./src/routers/meals.router.js";

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/meals", mealsRouter);

export default app;
