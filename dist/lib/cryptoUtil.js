"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class CryptoUtil {
    constructor(saltRounds) {
        this.saltRounds = saltRounds;
    }
    encryptPassword(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
    passwordCompare(passwordPlane, passwordHash) {
        return bcrypt.compare(passwordPlane, passwordHash);
    }
}
exports.default = CryptoUtil;
