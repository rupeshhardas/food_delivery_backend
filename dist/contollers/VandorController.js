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
exports.GetFoods = exports.AddFood = exports.UpdateVendorService = exports.UpdateVandorCoverProfile = exports.UpdateVendorProfile = exports.GetVendorProfile = exports.VandorLogin = void 0;
const AdminController_1 = require("./AdminController");
const utility_1 = require("../utility");
const models_1 = require("../models");
const VandorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingVandor = yield (0, AdminController_1.FindVendor)(undefined, email);
    if (existingVandor !== null) {
        const validation = yield (0, utility_1.ValidatePassword)(password, existingVandor.password, existingVandor.salt);
        if (validation) {
            const signature = yield (0, utility_1.GenerateSignature)({
                _id: existingVandor._id,
                email: existingVandor.email,
                name: existingVandor.name
            });
            return res.json(signature);
        }
        else {
            return res.json({ message: "password not valid" });
        }
    }
    return res.json({ message: "Login creaditials not valid" });
});
exports.VandorLogin = VandorLogin;
const GetVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingVandor = yield (0, AdminController_1.FindVendor)(user._id);
        return res.json(existingVandor);
    }
    return res.json({ message: "Vendor Information not found" });
});
exports.GetVendorProfile = GetVendorProfile;
const UpdateVendorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodTypes, name, address, phone } = req.body;
    const user = req.user;
    if (user) {
        const existingVandor = yield (0, AdminController_1.FindVendor)(user._id);
        if (existingVandor !== null) {
            existingVandor.name = name;
            existingVandor.phone = phone;
            existingVandor.address = address;
            existingVandor.foodType = foodTypes;
            const savedResult = yield existingVandor.save();
            return res.json(savedResult);
        }
        return res.json(existingVandor);
    }
    return res.json({ message: "Vendor Information not found" });
});
exports.UpdateVendorProfile = UpdateVendorProfile;
const UpdateVandorCoverProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vandor = yield (0, AdminController_1.FindVendor)(user._id);
        if (vandor !== null) {
            const files = req.files;
            const images = files === null || files === void 0 ? void 0 : files.map((file) => file.filename);
            vandor.coverImage.push(...images);
            const result = yield vandor.save();
            return res.json(result);
        }
    }
    return res.json({ message: "Something went wrong with add food" });
});
exports.UpdateVandorCoverProfile = UpdateVandorCoverProfile;
const UpdateVendorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingVandor = yield (0, AdminController_1.FindVendor)(user._id);
        if (existingVandor !== null) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const savedResult = yield existingVandor.save();
            return res.json(savedResult);
        }
        return res.json(existingVandor);
    }
    return res.json({ message: "Vendor Information not found" });
});
exports.UpdateVendorService = UpdateVendorService;
const AddFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const { name, description, category, foodType, readyTime, price } = req.body;
        const vandor = yield (0, AdminController_1.FindVendor)(user._id);
        if (vandor !== null) {
            const files = req.files;
            const images = files === null || files === void 0 ? void 0 : files.map((file) => file.filename);
            console.log(images);
            console.log(name, description, category, foodType, readyTime, price);
            const createdFood = yield models_1.Food.create({
                vandorId: vandor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                images: images,
                rating: 0
            });
            vandor.foods.push(createdFood);
            const result = yield vandor.save();
            return res.json(result);
        }
    }
    return res.json({ message: "Something went wrong with add food" });
});
exports.AddFood = AddFood;
const GetFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield models_1.Food.find({ vandorId: user._id });
        if (foods !== null) {
            return res.json(foods);
        }
    }
    return res.json({ message: "Foods Information not found" });
});
exports.GetFoods = GetFoods;
//# sourceMappingURL=VandorController.js.map