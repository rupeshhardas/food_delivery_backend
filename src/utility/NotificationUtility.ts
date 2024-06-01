//email

import { ACCOUNTSID, AUTHTOKENTWILLIO } from "../config";





//notifications





//otp

export const GenerateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000)
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 1000));

    return { otp, expiry }
}

export const OnRequestOTP = async (otp: number, toPhoneNumber: string) => {
    const accountSid = ACCOUNTSID;
    const authToken = AUTHTOKENTWILLIO;

    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `your verification OTP is  ${otp}`,
        from: '+12077091401',
        to: `+91${toPhoneNumber}`,
    })

    return response

}