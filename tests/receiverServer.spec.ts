import 'mocha';
import {expect} from 'chai';
import * as net from 'net';
import {ReceiverServer} from '../src/receiverServer';
import {RequestClient} from '../src/requestClient';

describe('ReceiverServer', () => {
  it('Should emit a response event once it gets a complete request', (done) => {
    const server = new ReceiverServer(60100);
    const client = new RequestClient(net.connect({port: 60100}));

    server.on('request', (request) => {
      server.closeServer();
      expect(request).to.be.eql({
        "type": "add",
        "user": "john",
        "title": "aTitle",
        "body": "aBody",
        "color": "blue",
      });
      done();
    });

    client.makeRequest({
      type: 'add',
      user: 'john',
      title: 'aTitle',
      body: 'aBody',
      color: 'blue',
    });
  });
});