"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faunadb_1 = __importDefault(require("faunadb"));
const sendDataToFaunaDB = (data, collectionName = "screenshots") => {
    const q = faunadb_1.default.query;
    const client = new faunadb_1.default.Client({
        secret: process.env.FAUNADB_SECRET_KEY || "",
    });
    client.query(q.Create(q.Collection(collectionName), { data }));
};
exports.default = sendDataToFaunaDB;
