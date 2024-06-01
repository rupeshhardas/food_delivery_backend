"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorRoute = void 0;
const express_1 = __importDefault(require("express"));
const contollers_1 = require("../contollers");
const middlewares_1 = require("../middlewares");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
exports.VandorRoute = router;
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        const sanitizedOriginalname = file.originalname.replace(/[\/\\?%*:|"<>]/g, '_');
        cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + sanitizedOriginalname);
    }
});
const images = (0, multer_1.default)({ storage: imageStorage }).array('images', 10);
router.post('/login', contollers_1.VandorLogin);
//below routes need authetication 
router.use(middlewares_1.Authenticate);
// router.get('/profile', Authenticate, GetVendorProfile)
router.get('/profile', contollers_1.GetVendorProfile);
router.patch('/profile', contollers_1.UpdateVendorProfile);
router.patch('/coverimage', images, contollers_1.UpdateVandorCoverProfile);
router.patch('/service', contollers_1.UpdateVendorService);
router.post('/food', images, contollers_1.AddFood);
router.get('/foods', contollers_1.GetFoods);
router.get('/', (req, res, next) => {
    res.json({ message: "hello from vandor" });
});
//# sourceMappingURL=VandorRoute.js.map