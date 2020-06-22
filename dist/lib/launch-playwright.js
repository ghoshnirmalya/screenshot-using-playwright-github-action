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
const send_data_to_image_kit_1 = __importDefault(require("./send-data-to-image-kit"));
const playwright = require("playwright");
const launchPlaywright = (name, args, url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield playwright[name].launch({ args });
    const page = yield browser.newPage();
    yield page.goto(url);
    const buffer = yield page.screenshot();
    const image = buffer.toString("base64");
    yield send_data_to_image_kit_1.default(image, url, name);
    yield browser.close();
});
exports.default = launchPlaywright;
