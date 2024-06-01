import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { APP_SECRECT } from '../config';
import { Request } from "express";
import { AuthPaylod } from '../dto';


export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature = async (paylod: AuthPaylod) => {
    return jwt.sign(paylod, APP_SECRECT, { expiresIn: '1d' });
}

export const ValidateSignature = async (req: Request) => {
    const signature = req.get("Authorization");
    if (signature) {
        const paylod = await jwt.verify(signature.split(' ')[1], APP_SECRECT) as AuthPaylod;
        req.user = paylod;
        return true;
    }
    return false
}