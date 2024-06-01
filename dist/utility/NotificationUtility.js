"use strict";
//email
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
exports.OnRequestOTP = exports.GenerateOtp = void 0;
const config_1 = require("../config");
//notifications
//otp
const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));
    return { otp, expiry };
};
exports.GenerateOtp = GenerateOtp;
const OnRequestOTP = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = config_1.ACCOUNTSID;
    const authToken = config_1.AUTHTOKENTWILLIO;
    const client = require('twilio')(accountSid, authToken);
    const response = yield client.messages.create({
        body: `your verification OTP is  ${otp}`,
        from: '+12077091401',
        to: `+91${toPhoneNumber}`,
    });
    return response;
});
exports.OnRequestOTP = OnRequestOTP;
//# sourceMappingURL=NotificationUtility.js.map