import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";


export const FindVendor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vandor.findOne({ email: email })
    } else {
        return await Vandor.findById(id);
    }
}

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, ownerName, address, password, pincode, foodType, email, phone } = <CreateVandorInput>req.body;

    const existingVandor = await FindVendor(undefined, email);
    if (existingVandor !== null) {
        return res.json({ message: "Vandor alredy exist with the email" });
    }

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const createdVandor = await Vandor.create({
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
    })
    return res.json(createdVandor);

}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {

    const vandors = await Vandor.find();

    if (vandors !== null) {
        return res.json(vandors);
    }

    return res.json({ message: "No Vandor data available" })

}

export const GetVandorById = async (req: Request, res: Response, next: NextFunction) => {

    const vandorId = req.params.id;

    const getVendor = await FindVendor(vandorId);

    if (getVendor !== null) {
        return res.json(getVendor);
    }

    return res.json({ message: "no vendor with this id " })

}