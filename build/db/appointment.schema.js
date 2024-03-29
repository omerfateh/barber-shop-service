"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchema = void 0;
// const Joi = require('joi');
const joi_1 = __importDefault(require("joi"));
exports.appointmentSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(30)
        .required(),
    job: joi_1.default.string()
        .min(3)
        .max(30)
        .required(),
});
// module.exports = schema;
