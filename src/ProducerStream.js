var stream = require('stream');

class ProducerStream extends stream.Writable {
   constructor (producer, topic, options = {}) {
     options.objectMode = options.objectMode || true;
     super(options);
     this._producer = producer;
     this._topic = topic;
  }

  _write (chunk, enc, cb) {
    try {
      var message = typeof chunk == 'object' ? JSON.stringify(chunk) : chunk;
      var topic = typeof this._topic == 'function' ?
            this._topic(message) :
            this._topic;

      // throw an error that will be emitted on the stream,
      // which bunyan will catch and rethrow outside of the logging.
      if (typeof topic !== 'string') {
        throw new TypeError('topic transformation function did not return' +
                            'a string. It returned: ' + topic);
      };
    }
    catch (e) {
      cb(e)
    }

    this._producer.send({
      topic: topic,
      message: {
        value: message
      }
    })
      .then(res => cb(null, res))
      .catch(cb);
  }
};

module.exports = ProducerStream;
