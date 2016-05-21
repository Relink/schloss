'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
        var message = (typeof chunk === 'undefined' ? 'undefined' : _typeof(chunk)) == 'object' ? JSON.stringify(chunk) : chunk;
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
        topic: topic,
        message: {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9kdWNlclN0cmVhbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQWI7O0lBRU0sYzs7O0FBQ0gsMEJBQWEsUUFBYixFQUF1QixLQUF2QixFQUE0QztBQUFBLFFBQWQsT0FBYyx5REFBSixFQUFJOztBQUFBOztBQUMxQyxZQUFRLFVBQVIsR0FBcUIsUUFBUSxVQUFSLElBQXNCLElBQTNDOztBQUQwQyxrR0FFcEMsT0FGb0M7O0FBRzFDLFVBQUssU0FBTCxHQUFpQixRQUFqQjtBQUNBLFVBQUssTUFBTCxHQUFjLEtBQWQ7QUFKMEM7QUFLNUM7Ozs7MkJBRU8sSyxFQUFPLEcsRUFBSyxFLEVBQUk7QUFDdEIsVUFBSTtBQUNGLFlBQUksVUFBVSxRQUFPLEtBQVAseUNBQU8sS0FBUCxNQUFnQixRQUFoQixHQUEyQixLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQTNCLEdBQW1ELEtBQWpFO0FBQ0EsWUFBSSxRQUFRLE9BQU8sS0FBSyxNQUFaLElBQXNCLFVBQXRCLEdBQ04sS0FBSyxNQUFMLENBQVksT0FBWixDQURNLEdBRU4sS0FBSyxNQUZYOzs7O0FBTUEsWUFBSSxPQUFPLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsZ0JBQU0sSUFBSSxTQUFKLENBQWMsaURBQ0EseUJBREEsR0FDNEIsS0FEMUMsQ0FBTjtBQUVEO0FBQ0YsT0FaRCxDQWFBLE9BQU8sQ0FBUCxFQUFVO0FBQ1IsV0FBRyxDQUFIO0FBQ0Q7O0FBRUQsV0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQjtBQUNsQixlQUFPLEtBRFc7QUFFbEIsaUJBQVM7QUFDUCxpQkFBTztBQURBO0FBRlMsT0FBcEIsRUFNRyxJQU5ILENBTVE7QUFBQSxlQUFPLEdBQUcsSUFBSCxFQUFTLEdBQVQsQ0FBUDtBQUFBLE9BTlIsRUFPRyxLQVBILENBT1MsRUFQVDtBQVFEOzs7O0VBbEMwQixPQUFPLFE7O0FBbUNuQzs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsY0FBakIiLCJmaWxlIjoiUHJvZHVjZXJTdHJlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgc3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbmNsYXNzIFByb2R1Y2VyU3RyZWFtIGV4dGVuZHMgc3RyZWFtLldyaXRhYmxlIHtcbiAgIGNvbnN0cnVjdG9yIChwcm9kdWNlciwgdG9waWMsIG9wdGlvbnMgPSB7fSkge1xuICAgICBvcHRpb25zLm9iamVjdE1vZGUgPSBvcHRpb25zLm9iamVjdE1vZGUgfHwgdHJ1ZTtcbiAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgIHRoaXMuX3Byb2R1Y2VyID0gcHJvZHVjZXI7XG4gICAgIHRoaXMuX3RvcGljID0gdG9waWM7XG4gIH1cblxuICBfd3JpdGUgKGNodW5rLCBlbmMsIGNiKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBtZXNzYWdlID0gdHlwZW9mIGNodW5rID09ICdvYmplY3QnID8gSlNPTi5zdHJpbmdpZnkoY2h1bmspIDogY2h1bms7XG4gICAgICB2YXIgdG9waWMgPSB0eXBlb2YgdGhpcy5fdG9waWMgPT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICB0aGlzLl90b3BpYyhtZXNzYWdlKSA6XG4gICAgICAgICAgICB0aGlzLl90b3BpYztcblxuICAgICAgLy8gdGhyb3cgYW4gZXJyb3IgdGhhdCB3aWxsIGJlIGVtaXR0ZWQgb24gdGhlIHN0cmVhbSxcbiAgICAgIC8vIHdoaWNoIGJ1bnlhbiB3aWxsIGNhdGNoIGFuZCByZXRocm93IG91dHNpZGUgb2YgdGhlIGxvZ2dpbmcuXG4gICAgICBpZiAodHlwZW9mIHRvcGljICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0b3BpYyB0cmFuc2Zvcm1hdGlvbiBmdW5jdGlvbiBkaWQgbm90IHJldHVybicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhIHN0cmluZy4gSXQgcmV0dXJuZWQ6ICcgKyB0b3BpYyk7XG4gICAgICB9O1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgY2IoZSlcbiAgICB9XG5cbiAgICB0aGlzLl9wcm9kdWNlci5zZW5kKHtcbiAgICAgIHRvcGljOiB0b3BpYyxcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgdmFsdWU6IG1lc3NhZ2VcbiAgICAgIH1cbiAgICB9KVxuICAgICAgLnRoZW4ocmVzID0+IGNiKG51bGwsIHJlcykpXG4gICAgICAuY2F0Y2goY2IpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2R1Y2VyU3RyZWFtO1xuIl19