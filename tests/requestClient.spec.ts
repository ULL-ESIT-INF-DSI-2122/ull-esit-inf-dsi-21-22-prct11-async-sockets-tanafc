import 'mocha';
import {expect} from 'chai';
import * as net from 'net';
import {RequestClient} from '../src/requestClient';

describe('RequestClient', () => {
  it('Should emit a response event once it gets a complete message', (done) => {
    const socket = new net.Socket();
    const client = new RequestClient(socket);

    client.on('response', (response) => {
      expect(response).to.be.eql({"type": "add", "success": true});
      done();
    });

    socket.emit('data', '{"type": "add"');
    socket.emit('data', ', "success": true}');
    socket.emit('end');
  });
});