import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.connect.js";
import hotelRoute from "./routers/hotel.route.js";
import cors from "cors";


dotenv.config();

const PORT = process.env.PORT || 3000 ;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/hotels", hotelRoute)


app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})