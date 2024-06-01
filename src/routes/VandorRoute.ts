import express, { Request, Response, NextFunction } from 'express';
import { AddFood, GetFoods, GetVendorProfile, UpdateVandorCoverProfile, UpdateVendorProfile, UpdateVendorService, VandorLogin } from '../contollers';
import { Authenticate } from '../middlewares';
import multer from 'multer';


const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: function (req, file, cb) {
        const sanitizedOriginalname = file.originalname.replace(/[\/\\?%*:|"<>]/g, '_');
        cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + sanitizedOriginalname);
    }
})

const images = multer({ storage: imageStorage }).array('images', 10)


router.post('/login', VandorLogin);


//below routes need authetication 
router.use(Authenticate)
// router.get('/profile', Authenticate, GetVendorProfile)
router.get('/profile', GetVendorProfile)
router.patch('/profile', UpdateVendorProfile)
router.patch('/coverimage', images, UpdateVandorCoverProfile)

router.patch('/service', UpdateVendorService)

router.post('/food', images, AddFood)
router.get('/foods', GetFoods)



router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "hello from vandor" });
})

export { router as VandorRoute };