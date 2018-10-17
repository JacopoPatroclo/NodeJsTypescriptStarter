"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const config_1 = require("../config");
const models_1 = require("../models");
const error_1 = require("./error");
const hprom_1 = require("./hprom");
class AuthUtil {
    constructor(cryptoUtil) {
        this.cryptoUtil = cryptoUtil;
        this.decodeToken = (req, res, next) => {
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            this.checkToken(req, res, next);
        };
        this.verifyUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (typeof email === 'string' && typeof password === 'string') {
                const user = yield hprom_1.default(models_1.UserModel
                    .findOne({
                    where: { email }
                }));
                if (user.success && user.data) {
                    const passCompare = this.cryptoUtil.passwordCompare(password, user.data.password);
                    const compare = yield hprom_1.default(passCompare);
                    if (compare.success && compare.data) {
                        req.user = user.data;
                        return next();
                    }
                    else {
                        return next(new error_1.default(new Error('La password fornita non corrisponde'), 'LOGGABLE'));
                    }
                }
                else {
                    return next(new error_1.default(new Error('Nessun utente con questa email'), 'LOGGABLE'));
                }
            }
            else {
                return next(new error_1.default(new Error('Inserire email e password'), 'LOGGABLE'));
            }
        });
        this.checkToken = expressJwt({ secret: config_1.default.JWT_SECRET });
        this.isAuth = [this.decodeToken, this.getFreshUser];
    }
    signToken(id) {
        return jwt.sign({ _id: id }, config_1.default.JWT_SECRET, { expiresIn: config_1.default.JWT_EXPIRE });
    }
    getFreshUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = req.user._id;
            const findUser = yield hprom_1.default(models_1.UserModel.findOne({ where: { uuid } }));
            if (findUser.success && findUser.data) {
                req.user = findUser.data;
                return next();
            }
            else {
                return next(new error_1.default(new Error(`Nessun utente corrisponde a ${uuid}`), 'LOGGABLE'));
            }
        });
    }
}
exports.default = AuthUtil;
