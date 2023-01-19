#!/usr/bin/node
import express from "express";
import { Request, Response } from "express";
import { logger } from "./logger";
import { notFound, serverError } from "./errors";
import fs from "fs-extra";
import Mustache from "mustache";

async function main() {
  const app = express();

  app.use(logger);

  app.use(express.urlencoded({ extended: true }));

  app.get("/world", function (req, res) {
    res.send("Hello World!");
  });

  function sendMsg(req: Request, res: Response) {
    const data = {
      msg: req.params.msg_path
        ? req.params.msg_path + (req.query.msg ? ":" + req.query.msg : "")
        : req.query.msg
        ? req.query.msg
        : "No msg",
    };

    fs.readFile("template/msg.html", "utf-8").then((template) => {
      let result = Mustache.render(template, data);
      res.send(result);
    });
  }

  app.get("/msg/:msg_path", sendMsg);
  app.get("/msg", sendMsg);

  app.get("/error", function (req, res) {
    throw "Test throwing Error";
  });

  app.use("/", express.static("public"));

  app.use(notFound);

  app.use(serverError);

  const port = 8001;

  app.listen(port, () => {
    console.log("You can find this server on: http://localhost:" + port);
  });
}

main();
