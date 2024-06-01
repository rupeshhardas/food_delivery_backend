"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
const express_1 = __importDefault(require("express"));
const contollers_1 = require("../contollers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.CustomerRoute = router;
//below are public routes
router.post('/signup', contollers_1.CustomerSignUp);
router.post('/login', contollers_1.CustomerLogin);
//below router required authetication
router.use(middlewares_1.Authenticate);
router.patch('/verify', contollers_1.CustomerVerify);
router.get('/otp', contollers_1.RequestOtp);
router.get('/profile', contollers_1.GetCustomerProfile);
router.patch('/profile', contollers_1.UpdateCustomerProfile);
//# sourceMappingURL=CustomerRoute.js.map