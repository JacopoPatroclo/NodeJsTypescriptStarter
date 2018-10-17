"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../lib/error");
class ErrorHandler {
    constructor(logger) {
        this.logger = logger;
        this.handler = (err, req, res, next) => {
            this.logger.log(err);
            if (err instanceof error_1.default) {
                if (err.payload.errors) {
                    return res
                        .status(400)
                        .json({
                        errors: err.payload.errors
                    });
                }
                return res
                    .status(400)
                    .json({
                    errors: [
                        { message: err.payload.message }
                    ]
                });
            }
            if (err instanceof Error) {
                return res
                    .status(500)
                    .json({
                    errors: [
                        { message: err.message }
                    ]
                });
            }
        };
    }
}
exports.default = ErrorHandler;
