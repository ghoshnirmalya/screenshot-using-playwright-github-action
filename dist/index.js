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
const launch_playwright_1 = __importDefault(require("./launch-playwright"));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const init = (siteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const site = yield prisma.site.findOne({
            where: {
                id: siteId,
            },
            include: {
                pages: true,
            },
        });
        console.log(site);
        site.pages.map((page) => __awaiter(void 0, void 0, void 0, function* () {
            yield launch_playwright_1.default("webkit", [], page);
            yield launch_playwright_1.default("firefox", [], page);
            yield launch_playwright_1.default("chromium", [], page);
        }));
    }
    catch (error) {
        console.log(error);
    }
});
init("a37d5b4d-befb-410a-b421-bfaa5d176ba4");
