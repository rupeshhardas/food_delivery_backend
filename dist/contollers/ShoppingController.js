"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRestaurantById = exports.SearchFood = exports.GetFoodIn30Min = exports.GetTopRestaurants = exports.GetFoodAvailability = void 0;
const models_1 = require("../models");
const GetFoodAvailability = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vandor.find({ pincode: pincode.trim(), serviceAvailable: true })
        .sort([["rating", "descending"]])
        .populate("foods");
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "No data available" });
});
exports.GetFoodAvailability = GetFoodAvailability;
const GetTopRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vandor.find({ pincode: pincode.trim(), serviceAvailable: false })
        .sort([["rating", "descending"]])
        .limit(10);
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "No data available" });
});
exports.GetTopRestaurants = GetTopRestaurants;
const GetFoodIn30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vandor.find({ pincode: pincode.trim(), serviceAvailable: false })
        .populate("foods");
    if (result.length > 0) {
        let foodResult = [];
        result.map((vandor) => {
            const foods = vandor.foods;
            foodResult.push(...foods.filter(food => food.readyTime < 30));
        });
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: "No data available" });
});
exports.GetFoodIn30Min = GetFoodIn30Min;
const SearchFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pincode = req.params.pincode;
    const result = yield models_1.Vandor.find({ pincode: pincode.trim(), serviceAvailable: false })
        .populate("foods");
    if (result.length > 0) {
        let foodResult = [];
        result.map(item => foodResult.push(...item.foods));
        return res.status(200).json(foodResult);
    }
    return res.status(400).json({ message: "No data available" });
});
exports.SearchFood = SearchFood;
const GetRestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield models_1.Vandor.findById(id)
        .populate("foods");
    if (result !== null) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "No data available" });
});
exports.GetRestaurantById = GetRestaurantById;
//# sourceMappingURL=ShoppingController.js.map