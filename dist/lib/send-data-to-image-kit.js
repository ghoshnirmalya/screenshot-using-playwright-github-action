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
const form_data_1 = __importDefault(require("form-data"));
const send_data_to_fauna_db_1 = __importDefault(require("./send-data-to-fauna-db"));
const fetch = require("node-fetch");
if (!globalThis.fetch) {
    globalThis.fetch = fetch;
}
const sendDataToImageKit = (image, url, name) => __awaiter(void 0, void 0, void 0, function* () {
    const formdata = new form_data_1.default();
    formdata.append("file", image);
    formdata.append("fileName", `${url}-${name}`);
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Basic ${process.env.IMAGEKIT_PRIVATE_KEY}`,
        },
        body: formdata,
        redirect: "follow",
    };
    try {
        const response = yield fetch("https://upload.imagekit.io/api/v1/files/upload", requestOptions);
        const data = yield response.json();
        send_data_to_fauna_db_1.default(data);
    }
    catch (error) {
        console.log("error", error);
    }
});
exports.default = sendDataToImageKit;
