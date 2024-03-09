"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlogSchema = exports.createBlogSchema = exports.signinSchema = exports.userSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional(),
});
exports.signinSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.createBlogSchema = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.UpdateBlogSchema = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
