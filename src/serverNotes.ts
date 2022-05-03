import * as net from 'net';
import {NotesFileSystem} from './notesFileSystem';
import {EventEmitter} from 'events';
import {RequestType, ResponseType} from './serverMessages';


const notesFileSystem = new NotesFileSystem();

export class ReceiverServer extends EventEmitter {
  private server: net.Server;

  constructor() {
    super();

    this.server = net.createServer((connection) => {
      console.log('A client has connected.');
      connection.write(`Connection established.\n`);

      connection.on('close', () => {
        console.log('A client has disconnected.');
      });

      let wholeRequest = '';
      connection.on('data', (requestChunk) => {
        wholeRequest += requestChunk;

        let messageLimit = wholeRequest.indexOf('\n');
        while (messageLimit !== -1) {
          const request = JSON.parse(wholeRequest.substring(0, messageLimit));
          this.emit('request', request, connection);

          wholeRequest = wholeRequest.substring(messageLimit + 1);
          messageLimit = wholeRequest.indexOf('\n');
        }
      });
    }).listen(60300, () => {
      console.log('Waiting for clients to connect.');
    });
  }

  public makeResponse(response: ResponseType, socket: net.Socket) {
    socket.write(JSON.stringify(response) + '\n');
  }
}

const server = new ReceiverServer();

server.on('request', (request, socket) => {
  if (request.type === 'add') {
    console.log('Recibida peticion add');
    server.makeResponse({type: 'add', success: true}, socket);
  } else if (request.type === 'update') {
    console.log('Recibida peticion update');
  } else if (request.type === 'remove') {
    console.log('Recibida peticion remove');
  } else if (request.type === 'read') {
    console.log('Recibida peticion read');
  } else if (request.type === 'list') {
    console.log('Recibida peticion list');
  }
});
