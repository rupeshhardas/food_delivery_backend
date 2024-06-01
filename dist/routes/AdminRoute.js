"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const contollers_1 = require("../contollers");
const router = express_1.default.Router();
exports.AdminRoute = router;
router.post('/vandor', contollers_1.CreateVandor);
router.get('/vandors', contollers_1.GetVandors);
router.get('/vandor/:id', contollers_1.GetVandorById);
router.get('/', (req, res, next) => {
    res.json({ message: "hello from admin" });
});
//# sourceMappingURL=AdminRoute.js.map