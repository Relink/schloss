var Kafka = require('no-kafka');
var stream = require('stream');
var _ = require('lodash');

class ProducerStream extends stream.Writable {
  constructor(producer, topic, options) {
    _.defaultsDeep(options, {
      objectMode: true
    });

    this._producer = producer;
    this._topic = topic;
    super(options);
  }

  _write(chunk, enc, cb) {
    try {
      var message = JSON.stringify(chunk);
      var topic = typeof this._topic == 'function' ? this._topic(message) : this._topic;

      // throw an error that will be emitted on the stream,
      // which bunyan will catch and rethrow outside of the logging.
      if (typeof topic !== 'string') {
        throw new TypeError('topic transformation function did not return' + 'a string. It returned: ' + topic);
      };
    } catch (e) {
      cb(e);
    }

    this._producer.send({
      message: {
        topic: topic,
        value: message
      }
    }).then(res => cb(null, res)).catch(cb);
  }
};

module.exports = {
  ProducerStream: ProducerStream
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hsb3NzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksUUFBUSxRQUFRLFVBQVIsQ0FBWjtBQUNBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtBQUNBLElBQUksSUFBSSxRQUFRLFFBQVIsQ0FBUjs7QUFFQSxNQUFNLGNBQU4sU0FBNkIsT0FBTyxRQUFwQyxDQUE2QztBQUMxQyxjQUFhLFFBQWIsRUFBdUIsS0FBdkIsRUFBOEIsT0FBOUIsRUFBdUM7QUFDckMsTUFBRSxZQUFGLENBQWUsT0FBZixFQUF3QjtBQUN0QixrQkFBWTtBQURVLEtBQXhCOztBQUlBLFNBQUssU0FBTCxHQUFpQixRQUFqQjtBQUNBLFNBQUssTUFBTCxHQUFjLEtBQWQ7QUFDQSxVQUFNLE9BQU47QUFDRjs7QUFFRCxTQUFRLEtBQVIsRUFBZSxHQUFmLEVBQW9CLEVBQXBCLEVBQXdCO0FBQ3RCLFFBQUk7QUFDRixVQUFJLFVBQVUsS0FBSyxTQUFMLENBQWUsS0FBZixDQUFkO0FBQ0EsVUFBSSxRQUFRLE9BQU8sS0FBSyxNQUFaLElBQXNCLFVBQXRCLEdBQ04sS0FBSyxNQUFMLENBQVksT0FBWixDQURNLEdBRU4sS0FBSyxNQUZYOzs7O0FBTUEsVUFBSSxPQUFPLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsY0FBTSxJQUFJLFNBQUosQ0FBYyxpREFDQSx5QkFEQSxHQUM0QixLQUQxQyxDQUFOO0FBRUQ7QUFDRixLQVpELENBYUEsT0FBTyxDQUFQLEVBQVU7QUFDUixTQUFHLENBQUg7QUFDRDs7QUFFRCxTQUFLLFNBQUwsQ0FBZSxJQUFmLENBQW9CO0FBQ2xCLGVBQVM7QUFDUCxlQUFPLEtBREE7QUFFUCxlQUFPO0FBRkE7QUFEUyxLQUFwQixFQU1HLElBTkgsQ0FNUSxPQUFPLEdBQUcsSUFBSCxFQUFTLEdBQVQsQ0FOZixFQU9HLEtBUEgsQ0FPUyxFQVBUO0FBUUQ7QUFyQzBDLENBc0M1Qzs7QUFFRCxPQUFPLE9BQVAsR0FBaUI7QUFDZixrQkFBZ0I7QUFERCxDQUFqQiIsImZpbGUiOiJzY2hsb3NzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEthZmthID0gcmVxdWlyZSgnbm8ta2Fma2EnKTtcbnZhciBzdHJlYW0gPSByZXF1aXJlKCdzdHJlYW0nKTtcbnZhciBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG5cbmNsYXNzIFByb2R1Y2VyU3RyZWFtIGV4dGVuZHMgc3RyZWFtLldyaXRhYmxlIHtcbiAgIGNvbnN0cnVjdG9yIChwcm9kdWNlciwgdG9waWMsIG9wdGlvbnMpIHtcbiAgICAgXy5kZWZhdWx0c0RlZXAob3B0aW9ucywge1xuICAgICAgIG9iamVjdE1vZGU6IHRydWVcbiAgICAgfSk7XG5cbiAgICAgdGhpcy5fcHJvZHVjZXIgPSBwcm9kdWNlcjtcbiAgICAgdGhpcy5fdG9waWMgPSB0b3BpYztcbiAgICAgc3VwZXIob3B0aW9ucyk7XG4gIH1cblxuICBfd3JpdGUgKGNodW5rLCBlbmMsIGNiKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoY2h1bmspXG4gICAgICB2YXIgdG9waWMgPSB0eXBlb2YgdGhpcy5fdG9waWMgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICB0aGlzLl90b3BpYyhtZXNzYWdlKSA6XG4gICAgICAgICAgICB0aGlzLl90b3BpYztcblxuICAgICAgLy8gdGhyb3cgYW4gZXJyb3IgdGhhdCB3aWxsIGJlIGVtaXR0ZWQgb24gdGhlIHN0cmVhbSxcbiAgICAgIC8vIHdoaWNoIGJ1bnlhbiB3aWxsIGNhdGNoIGFuZCByZXRocm93IG91dHNpZGUgb2YgdGhlIGxvZ2dpbmcuXG4gICAgICBpZiAodHlwZW9mIHRvcGljICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0b3BpYyB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiBkaWQgbm90IHJldHVybicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhIHN0cmluZy4gSXQgcmV0dXJuZWQ6ICcgKyB0b3BpYyk7XG4gICAgICB9O1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgY2IoZSlcbiAgICB9XG5cbiAgICB0aGlzLl9wcm9kdWNlci5zZW5kKHtcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgdG9waWM6IHRvcGljLFxuICAgICAgICB2YWx1ZTogbWVzc2FnZVxuICAgICAgfVxuICAgIH0pXG4gICAgICAudGhlbihyZXMgPT4gY2IobnVsbCwgcmVzKSlcbiAgICAgIC5jYXRjaChjYik7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBQcm9kdWNlclN0cmVhbTogUHJvZHVjZXJTdHJlYW1cbn07XG4iXX0=