import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", routes);
app.use("/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

export default app;
