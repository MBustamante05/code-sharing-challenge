import express from "express";
import cors from "cors";
import path from "path";

import { PORT, NODE_ENV } from "../config.js";
const __dirname = path.resolve();

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

import { connectDB } from "./lib/db.js";
import codeRouter from "./routes/code.route.js";

if (NODE_ENV !== "production") {
  app.use(cors(corsOptions));
}
if(NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}
app.use(express.json());

app.use("/api/v1/code", codeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
