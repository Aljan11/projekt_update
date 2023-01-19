#!/usr/bin/node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const errors_1 = require("./errors");
const fs_extra_1 = __importDefault(require("fs-extra"));
const mustache_1 = __importDefault(require("mustache"));
async function main() {
    const app = (0, express_1.default)();
    app.use(logger_1.logger);
    app.use(express_1.default.urlencoded({ extended: true }));
    app.get("/world", function (req, res) {
        res.send("Hello World!");
    });
    function sendMsg(req, res) {
        const data = {
            msg: req.params.msg_path
                ? req.params.msg_path + (req.query.msg ? ":" + req.query.msg : "")
                : req.query.msg
                    ? req.query.msg
                    : "No msg",
        };
        fs_extra_1.default.readFile("template/msg.html", "utf-8").then((template) => {
            let result = mustache_1.default.render(template, data);
            res.send(result);
        });
    }
    app.get("/msg/:msg_path", sendMsg);
    app.get("/msg", sendMsg);
    app.get("/error", function (req, res) {
        throw "Test throwing Error";
    });
    app.use("/", express_1.default.static("public"));
    app.use(errors_1.notFound);
    app.use(errors_1.serverError);
    const port = 8080;
    app.listen(port, () => {
        console.log("You can find this server on: http://localhost:" + port);
    });
}
main();
