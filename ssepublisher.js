const Subscriber = require("./subscriber");

class SSEPublisher extends Subscriber {
  clients;

  constructor() {
    super();
    this.clients = {};
  }

  addClient(id, connection) {
    this.clients[id] = connection;

    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    connection.writeHead(200, headers);
  }

  removeClient(id) {
    delete this.clients[id];
  }

  run(data) {
    Object.values(this.clients).forEach((client) => {
      client.write(`data: ${data}\n\n`);
    });
  }
}

module.exports = SSEPublisher;
