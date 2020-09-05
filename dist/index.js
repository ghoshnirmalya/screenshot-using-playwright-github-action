"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const launch_playwright_1 = __importDefault(require("./lib/launch-playwright"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const urlsString = process.argv[2];
    const urlsArray = JSON.parse(urlsString);
    urlsArray.map((url) => __awaiter(void 0, void 0, void 0, function* () {
        yield launch_playwright_1.default('webkit', [], url);
        yield launch_playwright_1.default('firefox', [], url);
        yield launch_playwright_1.default('chromium', [], url);
    }));
}))();
