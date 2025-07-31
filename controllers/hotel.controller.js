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
            photo,
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
            photo,
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
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Data not exist."
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch successfully",
                data: allData
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
};

export const hotelWithName = async (req, res) => {
    try {
        const { hotelName } = req.params;

        if (!hotelName) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Hotel name is missing"
                });
        };

        const data = await hotelModel.findOne({ name: hotelName });

        if (!data || data.length === 0) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Data not found"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch successfully",
                data: data
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
};

export const hotelWithPhone = async (req, res) => {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Phone number params is missing"
            });
    };

    const data = await hotelModel.findOne({ phoneNumber });

    if (!data || data.length === 0) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Hotel not found"
            });
    };

    return res
        .status(200)
        .json({
            success: true,
            message: "Data fetch successfully",
            data: data
        })

};

export const hotelRating = async (req, res) => {
    try {
        const { hotelrating } = req.params;

        if (!hotelrating) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "hotel rating is missing"
                });
        };

        if (isNaN(hotelrating)) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "hotel rating must be Number."
                });
        }

        const data = await hotelModel.find({
            rating: {
                $gt: hotelrating
            }
        });

        if (!data || data.length === 0) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Hotel data not found"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch successfully",
                data: data
            })

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
};

export const hotelCategory = async (req, res) => {
    try {
        const { hotelCategory } = req.params;

        if (!hotelCategory) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Hotel category not found"
                });
        };

        const hotelData = await hotelModel.find({ category: hotelCategory });

        if (!hotelData || hotelData.length === 0) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Data fetch successfully"
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Data fetch successfully",
                data: hotelData
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            })
    }
};
