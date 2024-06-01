import { Request, Response, NextFunction } from "express";
import { AuthPaylod } from "../dto";
import { ValidateSignature } from "../utility";


declare global {
    namespace Express {
        interface Request {
            user?: AuthPaylod
        }
    }
}


export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await ValidateSignature(req);

    if (validate) {
        next()
    } else {
        return res.json({ message: "User Not Authorize" });
    }

}