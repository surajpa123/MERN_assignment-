import express from "express";

import mongoose from "mongoose";
import env from "dotenv";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js"
import cors from "cors"



const app = express();

app.use(
  cors({
    allowedHeaders: ["Content-type", "Authorization"]
  })
);

app.use(cors({ origin: '*' }));


app.use(cors({ origin: 'https://mern-assignment-pink.vercel.app'}));

app.use(cors({ origin: 'http://localhost:5173' }));


env.config();
app.use(express.json());

//routes
app.use("/auth", userRouter);
app.use("/products", productRouter);

app.get("/", function(req, res){
  res.send("Hello World");
})


const db_url = process.env.DB_URL;

const connectDB = async function () {
  try {
    const connectDB = await mongoose.connect(db_url);

    console.log("DB Connected");
  } catch (error) {
    console.log("Error connecting");

    process.exit(1);
  }
};

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});
