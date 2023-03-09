/**
 * @typedef {import('events').EventEmitter} EventEmitter
 */

class Subscriber {
  publisher;

  /**
   *
   *
   * @param {EventEmitter} publisher
   * @param {string} event
   * @memberof Subscriber
   */
  subsribe(publisher, event) {
    publisher.on(event, this.run.bind(this));
  }

  run(data) {
    throw new Error("Not implemented");
  }
}

module.exports = Subscriber;
