"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const contollers_1 = require("../contollers");
const router = express_1.default.Router();
exports.ShoppingRoute = router;
router.get('/:pincode', contollers_1.GetFoodAvailability);
router.get('/top-restaurants/:pincode', contollers_1.GetTopRestaurants);
router.get('/foods-in-30-min/:pincode', contollers_1.GetFoodIn30Min);
router.get('/search/:pincode', contollers_1.SearchFood);
router.get('/restaurant/:id', contollers_1.GetRestaurantById);
//# sourceMappingURL=ShoppingRoutes.js.map