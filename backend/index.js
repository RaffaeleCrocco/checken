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
