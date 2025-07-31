import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.connect.js";
import hotelRoute from "./routers/hotel.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000 ;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDb();

app.use("/hotels", hotelRoute)


app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})