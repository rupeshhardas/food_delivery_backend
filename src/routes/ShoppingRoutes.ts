import express, { Request, Response, NextFunction } from "express";
import { GetFoodAvailability, GetFoodIn30Min, GetRestaurantById, GetTopRestaurants, SearchFood } from "../contollers";

const router = express.Router();

router.get('/:pincode', GetFoodAvailability);


router.get('/top-restaurants/:pincode', GetTopRestaurants)


router.get('/foods-in-30-min/:pincode', GetFoodIn30Min)


router.get('/search/:pincode', SearchFood)


router.get('/restaurant/:id', GetRestaurantById)

export { router as ShoppingRoute };