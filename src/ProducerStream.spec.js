var chai = require('chai');
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var EventEmitter = require('events').EventEmitter;
var stream = require('stream');

var ProducerStream = require('./ProducerStream');

describe('ProducerStream', () => {
  var s1, s2;

  beforeEach(() => {
    s1 = new stream.Readable({ objectMode: true, read: () => null});
  });

  describe('constructor', () => {
    var producerMock = {
      send: sinon.stub()
    };

    beforeEach(() => {
      producerMock.send.reset();
    });

    it('sends messages', done => {

      producerMock.send.returns(Promise.resolve(null))
      var ps = new ProducerStream(producerMock, 'topic');

      s1.pipe(ps);
      s1.push('foo');

      setTimeout(() => {
        expect(producerMock.send.firstCall.args[0].message)
          .to.deep.equal({topic: 'topic',
                          value: JSON.stringify('foo')})
        done();
      });
    });

    it('works with topic function', done => {

      producerMock.send.returns(Promise.resolve(null))
      var ps = new ProducerStream(producerMock, () => 'topic');

      s1.pipe(ps);
      s1.push('foo');

      setTimeout(() => {
        expect(producerMock.send.firstCall.args[0].message.topic)
          .to.equal('topic')
        done();
      });
    });
  });
});
