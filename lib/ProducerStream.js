'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stream = require('stream');

var ProducerStream = function (_stream$Writable) {
  _inherits(ProducerStream, _stream$Writable);

  function ProducerStream(producer, topic) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, ProducerStream);

    options.objectMode = options.objectMode || true;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProducerStream).call(this, options));

    _this._producer = producer;
    _this._topic = topic;
    return _this;
  }

  _createClass(ProducerStream, [{
    key: '_write',
    value: function _write(chunk, enc, cb) {
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
      }).then(function (res) {
        return cb(null, res);
      }).catch(cb);
    }
  }]);

  return ProducerStream;
}(stream.Writable);

;

module.exports = ProducerStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9kdWNlclN0cmVhbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiOztJQUVNLGM7OztBQUNILDBCQUFhLFFBQWIsRUFBdUIsS0FBdkIsRUFBNEM7QUFBQSxRQUFkLE9BQWMseURBQUosRUFBSTs7QUFBQTs7QUFDMUMsWUFBUSxVQUFSLEdBQXFCLFFBQVEsVUFBUixJQUFzQixJQUEzQzs7QUFEMEMsa0dBR3BDLE9BSG9DOztBQUkxQyxVQUFLLFNBQUwsR0FBaUIsUUFBakI7QUFDQSxVQUFLLE1BQUwsR0FBYyxLQUFkO0FBTDBDO0FBTTVDOzs7OzJCQUVPLEssRUFBTyxHLEVBQUssRSxFQUFJO0FBQ3RCLFVBQUk7QUFDRixZQUFJLFVBQVUsS0FBSyxTQUFMLENBQWUsS0FBZixDQUFkO0FBQ0EsWUFBSSxRQUFRLE9BQU8sS0FBSyxNQUFaLElBQXNCLFVBQXRCLEdBQ04sS0FBSyxNQUFMLENBQVksT0FBWixDQURNLEdBRU4sS0FBSyxNQUZYOzs7O0FBTUEsWUFBSSxPQUFPLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsZ0JBQU0sSUFBSSxTQUFKLENBQWMsaURBQ0EseUJBREEsR0FDNEIsS0FEMUMsQ0FBTjtBQUVEO0FBQ0YsT0FaRCxDQWFBLE9BQU8sQ0FBUCxFQUFVO0FBQ1IsV0FBRyxDQUFIO0FBQ0Q7O0FBRUQsV0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQjtBQUNsQixpQkFBUztBQUNQLGlCQUFPLEtBREE7QUFFUCxpQkFBTztBQUZBO0FBRFMsT0FBcEIsRUFNRyxJQU5ILENBTVE7QUFBQSxlQUFPLEdBQUcsSUFBSCxFQUFTLEdBQVQsQ0FBUDtBQUFBLE9BTlIsRUFPRyxLQVBILENBT1MsRUFQVDtBQVFEOzs7O0VBbkMwQixPQUFPLFE7O0FBb0NuQzs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiUHJvZHVjZXJTdHJlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbmNsYXNzIFByb2R1Y2VyU3RyZWFtIGV4dGVuZHMgc3RyZWFtLldyaXRhYmxlIHtcbiAgIGNvbnN0cnVjdG9yIChwcm9kdWNlciwgdG9waWMsIG9wdGlvbnMgPSB7fSkge1xuICAgICBvcHRpb25zLm9iamVjdE1vZGUgPSBvcHRpb25zLm9iamVjdE1vZGUgfHwgdHJ1ZTtcblxuICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgdGhpcy5fcHJvZHVjZXIgPSBwcm9kdWNlcjtcbiAgICAgdGhpcy5fdG9waWMgPSB0b3BpYztcbiAgfVxuXG4gIF93cml0ZSAoY2h1bmssIGVuYywgY2IpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShjaHVuaylcbiAgICAgIHZhciB0b3BpYyA9IHR5cGVvZiB0aGlzLl90b3BpYyA9PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgIHRoaXMuX3RvcGljKG1lc3NhZ2UpIDpcbiAgICAgICAgICAgIHRoaXMuX3RvcGljO1xuXG4gICAgICAvLyB0aHJvdyBhbiBlcnJvciB0aGF0IHdpbGwgYmUgZW1pdHRlZCBvbiB0aGUgc3RyZWFtLFxuICAgICAgLy8gd2hpY2ggYnVueWFuIHdpbGwgY2F0Y2ggYW5kIHJldGhyb3cgb3V0c2lkZSBvZiB0aGUgbG9nZ2luZy5cbiAgICAgIGlmICh0eXBlb2YgdG9waWMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3RvcGljIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uIGRpZCBub3QgcmV0dXJuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Egc3RyaW5nLiBJdCByZXR1cm5lZDogJyArIHRvcGljKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICBjYihlKVxuICAgIH1cblxuICAgIHRoaXMuX3Byb2R1Y2VyLnNlbmQoe1xuICAgICAgbWVzc2FnZToge1xuICAgICAgICB0b3BpYzogdG9waWMsXG4gICAgICAgIHZhbHVlOiBtZXNzYWdlXG4gICAgICB9XG4gICAgfSlcbiAgICAgIC50aGVuKHJlcyA9PiBjYihudWxsLCByZXMpKVxuICAgICAgLmNhdGNoKGNiKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9kdWNlclN0cmVhbTtcbiJdfQ==