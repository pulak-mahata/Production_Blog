import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
const app = express();
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

//static files
app.use(express.static(path.join(__dirname, './frontend/build')));

app.get("*" , function(req,res){
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
})

mongoose
  .connect(
    "mongodb+srv://pulak:pulak123@cluster0.1y6jima.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb+srv://admin:ESjtvUtwLfVb8c2F@cluster0.tdimc.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connected TO Database and Listening TO Localhost 5000")
  )
  .catch((err) => console.log(err));
