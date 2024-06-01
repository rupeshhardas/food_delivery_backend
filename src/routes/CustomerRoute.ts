import express, { Request, Response, NextFunction } from 'express';
import { CustomerLogin, CustomerSignUp, CustomerVerify, GetCustomerProfile, RequestOtp, UpdateCustomerProfile } from '../contollers';
import { Authenticate } from '../middlewares';

const router = express.Router();

//below are public routes

router.post('/signup', CustomerSignUp)

router.post('/login', CustomerLogin)


//below router required authetication

router.use(Authenticate)

router.patch('/verify', CustomerVerify)

router.get('/otp', RequestOtp)

router.get('/profile', GetCustomerProfile)

router.patch('/profile', UpdateCustomerProfile)

export { router as CustomerRoute };
