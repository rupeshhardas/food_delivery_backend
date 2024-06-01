"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTHTOKENTWILLIO = exports.ACCOUNTSID = exports.PORT = exports.APP_SECRET = exports.MONGO_URI = void 0;
require('dotenv').config();
exports.MONGO_URI = process.env.MONGO_URI;
// 'mongodb://localhost:27017/online_food_delivery';
exports.APP_SECRET = process.env.APP_SECRET;
exports.PORT = process.env.PORT || 8000;
exports.ACCOUNTSID = process.env.ACCOUNTSID;
exports.AUTHTOKENTWILLIO = process.env.AUTHTOKENTWILLIO;
//# sourceMappingURL=index.js.map