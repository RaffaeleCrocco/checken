import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import checksRoute from "./routes/checksRoute.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for CORS policy
app.use(cors());
/* app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
); */
// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle all other routes by serving the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome");
});

//middleware for checks
app.use("/checks", checksRoute);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`app is listening to the port: ${PORT} `);
    });
  })
  .catch((error) => {
    console.log(error);
  });
