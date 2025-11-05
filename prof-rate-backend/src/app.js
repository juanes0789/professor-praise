import express from "express";
import cors from "cors";
import { router as professorsRouter } from "./routes/professors.js";
import { router as ratingsRouter } from "./routes/ratings.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/professors", professorsRouter);
app.use("/api/ratings", ratingsRouter);

export default app;