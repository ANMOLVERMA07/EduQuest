import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";


dotenv.config();
const app = express();
const PORT  = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/admin",adminRoutes);


app.use("/",(req,res) => {
    res.send("Welcome to LMS Server");
});

connectDB()
.then(() => {
    console.log("MONGODB CONNECTED SUCCESSFULLY")
    app.listen(PORT, () => {
        console.log(`SERVER IS STARTED LISTENING AT PORT:${PORT}`);
    });
})
.catch((err) => console.log("Database cannot be connected",err));