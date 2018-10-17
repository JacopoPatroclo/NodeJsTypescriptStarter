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
const models_1 = require("../../models");
const hprom_1 = require("../../lib/hprom");
const error_1 = require("../../lib/error");
class UserController {
    constructor(logger) {
        this.logger = logger;
    }
    uuid(req, res, next, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            req.params.uuid = uuid;
            next();
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCreation = yield hprom_1.default(models_1.UserModel.create(req.body));
            if (userCreation.success) {
                res.status(201).send();
            }
            else {
                next(new error_1.default(userCreation.data, 'LOGGABLE'));
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const finduser = yield hprom_1.default(models_1.UserModel.findById(req.params.uuid));
            if (finduser.success && finduser.data) {
                res.status(200).json(finduser.data.dataValues);
            }
            else {
                next(new error_1.default(new Error('Nessun utente con questo id'), 'LOGGABLE'));
            }
        });
    }
}
exports.default = UserController;
