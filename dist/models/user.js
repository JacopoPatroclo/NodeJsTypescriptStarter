"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const sequelize_typescript_1 = require("sequelize-typescript");
let User = class User extends sequelize_typescript_1.Model {
    static encryptPassword(instance) {
        if (instance.password) {
            return bcrypt.hash(instance.password, 10)
                .then(hash => {
                instance.password = hash;
                return true;
            });
        }
        else {
            return true;
        }
    }
};
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Default(sequelize_typescript_1.Sequelize.UUIDV4),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "uuid", void 0);
__decorate([
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Length({
        min: 6,
        max: 20,
        msg: 'La password deve essere lunga almeno 6 caratteri'
    }),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.BeforeUpdate,
    sequelize_typescript_1.BeforeCreate,
    sequelize_typescript_1.BeforeBulkCreate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], User, "encryptPassword", null);
User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.default = User;
