import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());           // allows frontend requests
app.use(express.json());   // parses JSON body

app.get("/", (req, res) => {
  res.send("AI Chat Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
