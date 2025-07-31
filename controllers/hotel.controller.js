import mongoose from "mongoose";
import hotelModel from "../models/hotel.model.js";

export const addHotelController = async (req, res) => {
    try {
        const {
            name,
            category,
            location,
            rating,
            reviews,
            website,
            phoneNumber,
            checkInTime,
            checkOutTime,
            amenities,
            priceRange,
            reservationsNeeded,
            isParkingAvailable,
            isWifiAvailable,
            isPoolAvailable,
            isRestaurantAvailable,
            photos,
        } = req.body;

        if (!name || !location || !phoneNumber || !checkInTime || !checkOutTime) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const data = new hotelModel({
            name,
            category,
            location,
            rating,
            reviews,
            website,
            phoneNumber,
            checkInTime,
            checkOutTime,
            amenities,
            priceRange,
            reservationsNeeded,
            isParkingAvailable,
            isWifiAvailable,
            isPoolAvailable,
            isRestaurantAvailable,
            photos,
        });
        const result = await data.save();

        return res.status(201).json({
            success: true,
            message: "Data created successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const allHotels = async (req, res) => {
    try {
        const allData = await hotelModel.find();

        if (!allData || allData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not exist.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: allData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const hotelWithName = async (req, res) => {
    try {
        const { hotelName } = req.params;

        if (!hotelName) {
            return res.status(400).json({
                success: false,
                message: "Hotel name is missing",
            });
        }

        const data = await hotelModel.findOne({ name: hotelName });

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const hotelWithPhone = async (req, res) => {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
        return res.status(400).json({
            success: false,
            message: "Phone number params is missing",
        });
    }

    const data = await hotelModel.findOne({ phoneNumber });

    if (!data || data.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Hotel not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Data fetch successfully",
        data: data,
    });
};

export const hotelRating = async (req, res) => {
    try {
        const { hotelrating } = req.params;

        if (!hotelrating) {
            return res.status(400).json({
                success: false,
                message: "hotel rating is missing",
            });
        }

        if (isNaN(hotelrating)) {
            return res.status(400).json({
                success: false,
                message: "hotel rating must be Number.",
            });
        }

        const data = await hotelModel.find({
            rating: {
                $gt: hotelrating,
            },
        });

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hotel data not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const hotelCategory = async (req, res) => {
    try {
        const { hotelCategory } = req.params;

        if (!hotelCategory) {
            return res.status(400).json({
                success: false,
                message: "Hotel category not found",
            });
        }

        const hotelData = await hotelModel.find({ category: hotelCategory });

        if (!hotelData || hotelData.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Data fetch successfully",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data: hotelData,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const deleteHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;

        if (!hotelId) {
            return res.status(400).json({
                success: false,
                message: "Hotel id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid id format",
            });
        }

        const deleteData = await hotelModel.findByIdAndDelete(hotelId);

        if (!deleteData) {
            return res.status(404).json({
                success: false,
                message: "Data not exist.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Data deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            category,
            location,
            rating,
            reviews,
            website,
            phoneNumber,
            checkInTime,
            checkOutTime,
            amenities,
            priceRange,
            reservationsNeeded,
            isParkingAvailable,
            isWifiAvailable,
            isPoolAvailable,
            isRestaurantAvailable,
            photos
        } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Hotel id is missing",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid id format",
            });
        }

        if (
            !name &&
            !category &&
            !location &&
            !rating &&
            !reviews &&
            !website &&
            !phoneNumber &&
            !checkInTime &&
            !checkOutTime &&
            !amenities &&
            !priceRange &&
            !reservationsNeeded &&
            !isParkingAvailable &&
            !isWifiAvailable &&
            !isPoolAvailable &&
            !isRestaurantAvailable &&
            !photos
        ) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required.",
            });
        }

        const hotelExist = await hotelModel.findById(id);

        if (!hotelExist) {
            return res.status(404).json({
                success: false,
                message: "Hotel not Exist",
            });
        }

        const data = {
            name: name || hotelExist.name,
            category: category || hotelExist.category,
            location: location || hotelExist.location,
            rating: rating || hotelExist.rating,
            reviews: reviews || hotelExist.reviews,
            website: website || hotelExist.website,
            phoneNumber: phoneNumber || hotelExist.phoneNumber,
            checkInTime: checkInTime || hotelExist.checkInTime,
            checkOutTime: checkOutTime || hotelExist.checkOutTime,
            amenities: amenities || hotelExist.amenities,
            priceRange: priceRange || hotelExist.priceRange,
            reservationsNeeded: reservationsNeeded ?? hotelExist.reservationsNeeded,
            isParkingAvailable: isParkingAvailable ?? hotelExist.isParkingAvailable,
            isWifiAvailable: isWifiAvailable ?? hotelExist.isWifiAvailable,
            isPoolAvailable: isPoolAvailable ?? hotelExist.isPoolAvailable,
            isRestaurantAvailable:
                isRestaurantAvailable ?? hotelExist.isRestaurantAvailable,
            photos: photos || hotelExist.photos
        };

        const updateData = await hotelModel.findByIdAndUpdate(id, data, { new: true });

        return res
            .status(400)
            .json(({
                success: true,
                message: "Data update successfully",
                data: updateData
            }))
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
