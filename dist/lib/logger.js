"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
class Logger {
    constructor() {
    }
    log(message) {
        if (message instanceof (error_1.default)) {
            switch (message.type) {
                case 'EXEPTION':
                    console.error(message);
                    break;
                case 'LOGGABLE':
                    console.log(message);
                    break;
                default:
                    console.error(message);
                    break;
            }
        }
        else {
            console.error(message);
        }
    }
}
exports.default = Logger;
