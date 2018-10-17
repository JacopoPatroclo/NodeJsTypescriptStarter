"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HProm(promise) {
    return new Promise((resolve) => {
        promise
            .then((data) => {
            resolve({
                success: true,
                data
            });
        })
            .catch((data) => resolve({
            success: false,
            data
        }));
    });
}
exports.default = HProm;
