'use strict';

var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var EventEmitter = require('events').EventEmitter;
var stream = require('stream');

var ProducerStream = require('./ProducerStream');

describe('ProducerStream', function () {
  var s1, s2;

  beforeEach(function () {
    s1 = new stream.Readable({ objectMode: true, read: function read() {
        return null;
      } });
  });

  describe('constructor', function () {
    var producerMock = {
      send: sinon.stub()
    };

    beforeEach(function () {
      producerMock.send.reset();
    });

    it('sends messages', function (done) {

      producerMock.send.returns(Promise.resolve(null));
      var ps = new ProducerStream(producerMock, 'topic');

      s1.pipe(ps);
      s1.push('foo');

      setTimeout(function () {
        expect(producerMock.send.firstCall.args[0].message).to.deep.equal({ topic: 'topic',
          value: JSON.stringify('foo') });
        done();
      });
    });

    it('works with topic function', function (done) {

      producerMock.send.returns(Promise.resolve(null));
      var ps = new ProducerStream(producerMock, function () {
        return 'topic';
      });

      s1.pipe(ps);
      s1.push('foo');

      setTimeout(function () {
        expect(producerMock.send.firstCall.args[0].message.topic).to.equal('topic');
        done();
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm9kdWNlclN0cmVhbS5zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxPQUFPLFFBQVEsTUFBUixDQUFYO0FBQ0EsS0FBSyxHQUFMLENBQVMsUUFBUSxZQUFSLENBQVQ7QUFDQSxJQUFJLFNBQVMsS0FBSyxNQUFsQjtBQUNBLElBQUksUUFBUSxRQUFRLE9BQVIsQ0FBWjtBQUNBLElBQUksYUFBYSxRQUFRLFlBQVIsQ0FBakI7QUFDQSxJQUFJLGVBQWUsUUFBUSxRQUFSLEVBQWtCLFlBQXJDO0FBQ0EsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiOztBQUVBLElBQUksaUJBQWlCLFFBQVEsa0JBQVIsQ0FBckI7O0FBRUEsU0FBUyxnQkFBVCxFQUEyQixZQUFNO0FBQy9CLE1BQUksRUFBSixFQUFRLEVBQVI7O0FBRUEsYUFBVyxZQUFNO0FBQ2YsU0FBSyxJQUFJLE9BQU8sUUFBWCxDQUFvQixFQUFFLFlBQVksSUFBZCxFQUFvQixNQUFNO0FBQUEsZUFBTSxJQUFOO0FBQUEsT0FBMUIsRUFBcEIsQ0FBTDtBQUNELEdBRkQ7O0FBSUEsV0FBUyxhQUFULEVBQXdCLFlBQU07QUFDNUIsUUFBSSxlQUFlO0FBQ2pCLFlBQU0sTUFBTSxJQUFOO0FBRFcsS0FBbkI7O0FBSUEsZUFBVyxZQUFNO0FBQ2YsbUJBQWEsSUFBYixDQUFrQixLQUFsQjtBQUNELEtBRkQ7O0FBSUEsT0FBRyxnQkFBSCxFQUFxQixnQkFBUTs7QUFFM0IsbUJBQWEsSUFBYixDQUFrQixPQUFsQixDQUEwQixRQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBMUI7QUFDQSxVQUFJLEtBQUssSUFBSSxjQUFKLENBQW1CLFlBQW5CLEVBQWlDLE9BQWpDLENBQVQ7O0FBRUEsU0FBRyxJQUFILENBQVEsRUFBUjtBQUNBLFNBQUcsSUFBSCxDQUFRLEtBQVI7O0FBRUEsaUJBQVcsWUFBTTtBQUNmLGVBQU8sYUFBYSxJQUFiLENBQWtCLFNBQWxCLENBQTRCLElBQTVCLENBQWlDLENBQWpDLEVBQW9DLE9BQTNDLEVBQ0csRUFESCxDQUNNLElBRE4sQ0FDVyxLQURYLENBQ2lCLEVBQUMsT0FBTyxPQUFSO0FBQ0MsaUJBQU8sS0FBSyxTQUFMLENBQWUsS0FBZixDQURSLEVBRGpCO0FBR0E7QUFDRCxPQUxEO0FBTUQsS0FkRDs7QUFnQkEsT0FBRywyQkFBSCxFQUFnQyxnQkFBUTs7QUFFdEMsbUJBQWEsSUFBYixDQUFrQixPQUFsQixDQUEwQixRQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBMUI7QUFDQSxVQUFJLEtBQUssSUFBSSxjQUFKLENBQW1CLFlBQW5CLEVBQWlDO0FBQUEsZUFBTSxPQUFOO0FBQUEsT0FBakMsQ0FBVDs7QUFFQSxTQUFHLElBQUgsQ0FBUSxFQUFSO0FBQ0EsU0FBRyxJQUFILENBQVEsS0FBUjs7QUFFQSxpQkFBVyxZQUFNO0FBQ2YsZUFBTyxhQUFhLElBQWIsQ0FBa0IsU0FBbEIsQ0FBNEIsSUFBNUIsQ0FBaUMsQ0FBakMsRUFBb0MsT0FBcEMsQ0FBNEMsS0FBbkQsRUFDRyxFQURILENBQ00sS0FETixDQUNZLE9BRFo7QUFFQTtBQUNELE9BSkQ7QUFLRCxLQWJEO0FBY0QsR0F2Q0Q7QUF3Q0QsQ0EvQ0QiLCJmaWxlIjoiUHJvZHVjZXJTdHJlYW0uc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBjaGFpID0gcmVxdWlyZSgnY2hhaScpO1xuY2hhaS51c2UocmVxdWlyZSgnc2lub24tY2hhaScpKTtcbnZhciBleHBlY3QgPSBjaGFpLmV4cGVjdDtcbnZhciBzaW5vbiA9IHJlcXVpcmUoJ3Npbm9uJyk7XG52YXIgcHJveHlxdWlyZSA9IHJlcXVpcmUoJ3Byb3h5cXVpcmUnKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKS5FdmVudEVtaXR0ZXI7XG52YXIgc3RyZWFtID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbnZhciBQcm9kdWNlclN0cmVhbSA9IHJlcXVpcmUoJy4vUHJvZHVjZXJTdHJlYW0nKTtcblxuZGVzY3JpYmUoJ1Byb2R1Y2VyU3RyZWFtJywgKCkgPT4ge1xuICB2YXIgczEsIHMyO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHMxID0gbmV3IHN0cmVhbS5SZWFkYWJsZSh7IG9iamVjdE1vZGU6IHRydWUsIHJlYWQ6ICgpID0+IG51bGx9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgIHZhciBwcm9kdWNlck1vY2sgPSB7XG4gICAgICBzZW5kOiBzaW5vbi5zdHViKClcbiAgICB9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBwcm9kdWNlck1vY2suc2VuZC5yZXNldCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbmRzIG1lc3NhZ2VzJywgZG9uZSA9PiB7XG5cbiAgICAgIHByb2R1Y2VyTW9jay5zZW5kLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKG51bGwpKVxuICAgICAgdmFyIHBzID0gbmV3IFByb2R1Y2VyU3RyZWFtKHByb2R1Y2VyTW9jaywgJ3RvcGljJyk7XG5cbiAgICAgIHMxLnBpcGUocHMpO1xuICAgICAgczEucHVzaCgnZm9vJyk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBleHBlY3QocHJvZHVjZXJNb2NrLnNlbmQuZmlyc3RDYWxsLmFyZ3NbMF0ubWVzc2FnZSlcbiAgICAgICAgICAudG8uZGVlcC5lcXVhbCh7dG9waWM6ICd0b3BpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBKU09OLnN0cmluZ2lmeSgnZm9vJyl9KVxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGl0KCd3b3JrcyB3aXRoIHRvcGljIGZ1bmN0aW9uJywgZG9uZSA9PiB7XG5cbiAgICAgIHByb2R1Y2VyTW9jay5zZW5kLnJldHVybnMoUHJvbWlzZS5yZXNvbHZlKG51bGwpKVxuICAgICAgdmFyIHBzID0gbmV3IFByb2R1Y2VyU3RyZWFtKHByb2R1Y2VyTW9jaywgKCkgPT4gJ3RvcGljJyk7XG5cbiAgICAgIHMxLnBpcGUocHMpO1xuICAgICAgczEucHVzaCgnZm9vJyk7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBleHBlY3QocHJvZHVjZXJNb2NrLnNlbmQuZmlyc3RDYWxsLmFyZ3NbMF0ubWVzc2FnZS50b3BpYylcbiAgICAgICAgICAudG8uZXF1YWwoJ3RvcGljJylcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=