import { Request, Response, NextFunction } from "express";
import { EditVandorInput, VandorLoginInput } from "../dto";
import { FindVendor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { CreateFoodInput } from "../dto/Food.dto";
import { Food } from "../models";

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <VandorLoginInput>req.body;

    const existingVandor = await FindVendor(undefined, email);

    if (existingVandor !== null) {
        const validation = await ValidatePassword(password, existingVandor.password, existingVandor.salt);

        if (validation) {
            const signature = await GenerateSignature({
                _id: existingVandor._id as string,
                email: existingVandor.email,
                name: existingVandor.name

            })
            return res.json(signature);
        } else {
            return res.json({ message: "password not valid" })
        }
    }

    return res.json({ message: "Login creaditials not valid" });
}

export const GetVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVandor = await FindVendor(user._id)
        return res.json(existingVandor)
    }

    return res.json({ message: "Vendor Information not found" });

}

export const UpdateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { foodTypes, name, address, phone } = <EditVandorInput>req.body;
    const user = req.user;

    if (user) {
        const existingVandor = await FindVendor(user._id)
        if (existingVandor !== null) {
            existingVandor.name = name;
            existingVandor.phone = phone;
            existingVandor.address = address;
            existingVandor.foodType = foodTypes;

            const savedResult = await existingVandor.save()
            return res.json(savedResult)
        }
        return res.json(existingVandor)
    }

    return res.json({ message: "Vendor Information not found" });
}

export const UpdateVandorCoverProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {

        const vandor = await FindVendor(user._id);

        if (vandor !== null) {

            const files = req.files as [Express.Multer.File]

            const images = files?.map((file: Express.Multer.File) => file.filename)

            vandor.coverImage.push(...images)

            const result = await vandor.save();

            return res.json(result);
        }

    }

    return res.json({ message: "Something went wrong with add food" });

}

export const UpdateVendorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existingVandor = await FindVendor(user._id)
        if (existingVandor !== null) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable
            const savedResult = await existingVandor.save()
            return res.json(savedResult)
        }
        return res.json(existingVandor)
    }

    return res.json({ message: "Vendor Information not found" });
}


export const AddFood = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {

        const { name, description, category, foodType, readyTime, price } = <CreateFoodInput>req.body;
        const vandor = await FindVendor(user._id);

        if (vandor !== null) {

            const files = req.files as [Express.Multer.File]

            const images = files?.map((file: Express.Multer.File) => file.filename)

            console.log(images)
            console.log(name, description, category, foodType, readyTime, price)

            const createdFood = await Food.create({
                vandorId: vandor._id,
                name: name,
                description: description,
                category: category,
                foodType: foodType,
                readyTime: readyTime,
                price: price,
                images: images,
                rating: 0
            })

            vandor.foods.push(createdFood);
            const result = await vandor.save();

            return res.json(result);
        }

    }

    return res.json({ message: "Something went wrong with add food" });
}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {

        const foods = await Food.find({ vandorId: user._id })

        if (foods !== null) {
            return res.json(foods);
        }

    }

    return res.json({ message: "Foods Information not found" });
}