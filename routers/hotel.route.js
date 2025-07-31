import express from "express";
import {
    addHotelController,
    allHotels,
    deleteHotel,
    hotelCategory,
    hotelRating,
    hotelWithName,
    hotelWithPhone,
    updateHotel,
} from "../controllers/hotel.controller.js";

const hotelRoute = express.Router();

hotelRoute.route("/").get(allHotels);
hotelRoute.route("/:hotelName").get(hotelWithName);
hotelRoute.route("/directory/:phoneNumber").get(hotelWithPhone);
hotelRoute.route("/rating/:hotelrating").get(hotelRating);
hotelRoute.route("/category/:hotelCategory").get(hotelCategory);
hotelRoute.route("/add").post(addHotelController);
hotelRoute.route("/delete/:hotelId").delete(deleteHotel);
hotelRoute.route("/update/:id").put(updateHotel);

export default hotelRoute;
