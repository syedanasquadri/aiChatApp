import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.js";

console.log("🚀 Server starting...");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoute);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
