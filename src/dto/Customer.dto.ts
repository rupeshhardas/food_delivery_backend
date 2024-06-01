import { IsEmail, IsEmpty, Length } from "class-validator";

export class CreateCustomerInput {
    @IsEmail()
    email: string;

    @Length(7, 12)
    phone: string;

    @Length(8, 16)
    password: string;
}

export class EditCustomerProfileInputs {

    @Length(3, 16)
    firstName: string;

    @Length(3, 16)
    lastName: string;

    @Length(6, 26)
    address: string;

}


export class CustomerLoginInputs {
    @IsEmail()
    email: string;

    @Length(8, 16)
    password: string
}


export interface CustomerPayload {
    _id: string;
    email: string;
    verified: boolean;
}