import fs from "fs";
import express from "express";
import cors from "cors";
import v1Router from "./routes/v1.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

app.use("/v1", v1Router);



const port = 3000;

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

// run the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
