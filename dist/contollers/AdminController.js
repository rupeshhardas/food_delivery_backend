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
exports.GetVandorById = exports.GetVandors = exports.CreateVandor = exports.FindVendor = void 0;
const models_1 = require("../models");
const utility_1 = require("../utility");
const FindVendor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return yield models_1.Vandor.findOne({ email: email });
    }
    else {
        return yield models_1.Vandor.findById(id);
    }
});
exports.FindVendor = FindVendor;
const CreateVandor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ownerName, address, password, pincode, foodType, email, phone } = req.body;
    const existingVandor = yield (0, exports.FindVendor)(undefined, email);
    if (existingVandor !== null) {
        return res.json({ message: "Vandor alredy exist with the email" });
    }
    const salt = yield (0, utility_1.GenerateSalt)();
    const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
    const createdVandor = yield models_1.Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        phone: phone,
        ownerName: ownerName,
        rating: 0,
        serviceAvailable: false,
        coverImage: [],
        foods: []
    });
    return res.json(createdVandor);
});
exports.CreateVandor = CreateVandor;
const GetVandors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vandors = yield models_1.Vandor.find();
    if (vandors !== null) {
        return res.json(vandors);
    }
    return res.json({ message: "No Vandor data available" });
});
exports.GetVandors = GetVandors;
const GetVandorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vandorId = req.params.id;
    const getVendor = yield (0, exports.FindVendor)(vandorId);
    if (getVendor !== null) {
        return res.json(getVendor);
    }
    return res.json({ message: "no vendor with this id " });
});
exports.GetVandorById = GetVandorById;
//# sourceMappingURL=AdminController.js.map