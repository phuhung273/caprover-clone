const express = require("express");
const app = express();
const port = 8000;

app.set("view engine", "ejs");

const EventEmitter = require("events");

const errorEventPublisher = new EventEmitter();

const FileWriterSubscriber = require("./file_writer");
const fileWriterSubsrciber = new FileWriterSubscriber("log.txt");
fileWriterSubsrciber.subsribe(errorEventPublisher, "error");

const SSEPublisher = require("./ssepublisher");
const ssePublisher = new SSEPublisher();
ssePublisher.subsribe(errorEventPublisher, "error");

const fs = require("fs");
app.get("/", (req, res) => {
  fs.readFile("log.txt", (err, data) => {
    if (err) {
      console.log(err);
      return res.send(err.message);
    }

    res.render("index", { data });
  });
});

app.get("/sse", (req, res) => {
  const clientId = new Date().getTime();

  ssePublisher.addClient(clientId, res);

  req.on("close", () => {
    ssePublisher.removeClient(clientId);
  });
});

app.post("/", (req, res) => {
  errorEventPublisher.emit("error", "You have a new error");
  res.send("done");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
