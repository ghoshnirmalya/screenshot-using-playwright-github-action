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
const send_data_to_db_1 = __importDefault(require("./send-data-to-db"));
const playwright = require("playwright");
const launchPlaywright = (browserType, args, page) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield playwright[browserType].launch({ args });
    const browserPage = yield browser.newPage();
    yield browserPage.goto(page.url);
    const buffer = yield browserPage.screenshot();
    const image = buffer.toString("base64");
    yield send_data_to_db_1.default(image, page, browserType);
    yield browser.close();
});
exports.default = launchPlaywright;
