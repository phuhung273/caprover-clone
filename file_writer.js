const fs = require("fs");
const Subscriber = require("./subscriber");

class FileWriter extends Subscriber {
  destination;

  constructor(destination) {
    super();
    this.destination = destination;
  }

  run(data) {
    fs.appendFile(this.destination, (data + "\n").repeat(10), (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  }
}

module.exports = FileWriter;
