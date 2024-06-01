import express, { Request, Response, NextFunction } from 'express';
import { validate } from "class-validator";
import { plainToClass } from 'class-transformer';
import { CreateCustomerInput, CustomerLoginInputs, EditCustomerProfileInputs } from '../dto/Customer.dto';
import { GenerateOtp, GeneratePassword, GenerateSalt, GenerateSignature, OnRequestOTP, ValidatePassword } from '../utility';
import { Customer } from '../models/Customer';


export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {

    const customerInputs = plainToClass(CreateCustomerInput, req.body);

    const inputErrors = await validate(customerInputs, { validationError: { target: true } });

    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }

    const { email, phone, password } = customerInputs;

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const { otp, expiry } = GenerateOtp();

    const existingCustomer = await Customer.findOne({ email: email });

    if (existingCustomer !== null) {
        return res.status(400).json({ message: "user  exists with provided email" })
    }

    const result = await Customer.create({
        email: email,
        password: userPassword,
        phone: phone,
        salt: salt,
        otp: otp,
        otp_expiry: expiry,
        firstName: '',
        lastName: '',
        address: '',
        verified: false,
        lat: 0,
        lng: 0,
    })

    if (result) {
        await OnRequestOTP(otp, phone);

        const signature = await GenerateSignature({
            _id: result._id as string,
            email: result.email,
            verified: result.verified
        })


        return res.status(201).json({ "AuthToken": signature, verified: result.verified, email: result.email })

    }

    return res.status(400).json({ message: "Error with signup" })

}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {

    const loginInputs = plainToClass(CustomerLoginInputs, req.body);

    const loginErrors = await validate(loginInputs, { validationError: { target: true } })

    if (loginErrors.length > 0) {
        return res.status(400).json(loginErrors);
    }
    const { email, password } = loginInputs;
    const customer = await Customer.findOne({ email: email })

    if (customer) {
        const validation = await ValidatePassword(password, customer.password, customer.salt);

        if (validation) {
            //generate token
            const signature = await GenerateSignature({
                _id: customer.id,
                email: customer.email,
                verified: customer.verified
            });

            //send token to user
            return res.status(200).json({ "AuthToken": signature, verified: customer.verified, email: customer.email });

        }
    }
    return res.status(400).json({ message: "Error with Login" });

}

export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {
    const { otp } = req.body;

    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id);

        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;

                const updateCustomerResponse = await profile.save();

                const signature = await GenerateSignature({
                    _id: updateCustomerResponse._id as string,
                    email: updateCustomerResponse.email,
                    verified: updateCustomerResponse.verified
                })
                return res.status(200).json({ Token: signature, verified: updateCustomerResponse.verified, email: updateCustomerResponse.email })
            }

            return res.status(400).json({ message: "otp is invalid or expired" });
        }
    }

    return res.status(400).json({ message: "error with otp validation" });


}

export const RequestOtp = async (req: Request, res: Response, next: NextFunction) => {

    const customer = req.user

    if (customer) {
        const profile = await Customer.findById(customer._id);

        if (profile) {

            const { otp, expiry } = GenerateOtp();

            profile.otp = otp;
            profile.otp_expiry = expiry;

            //saving new gerated otp & expiry
            await profile.save();

            //send otp to user
            await OnRequestOTP(otp, profile.phone)

            return res.status(200).json({ "message": "Otp sent to your requested phone number" })
        }

    }
    return res.status(400).json({ message: "Error with otp Request!" });

}

export const GetCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id);
        return res.status(200).json(profile);
    }
    return res.status(400).json({ "message": "Error in fetching profile" });


}

export const UpdateCustomerProfile = async (req: Request, res: Response, next: NextFunction) => {
    const customer = req.user;

    const profileInputs = plainToClass(EditCustomerProfileInputs, req.body);

    const inputErrors = await validate(profileInputs, { validationError: { target: true } });

    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }

    const { firstName, lastName, address } = profileInputs;

    if (customer) {
        const profile = await Customer.findById(customer._id);
        if (profile) {
            profile.firstName = firstName;
            profile.lastName = lastName;
            profile.address = address;

            const result = await profile.save();

            return res.status(200).json(result);

        }
    }
}

