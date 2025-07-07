import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api", routes);
app.use("/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

export default app;
