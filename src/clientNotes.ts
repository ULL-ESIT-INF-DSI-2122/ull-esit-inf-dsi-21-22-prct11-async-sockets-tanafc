import {RequestType, ResponseType} from './serverMessages';
import {EventEmitter} from 'events';
import * as net from 'net';

export class RequestClient extends EventEmitter {
  constructor(private connection: net.Socket) {
    super();

    // Imprimir cualquier tipo de mensaje que nos envíe el servidor.
    let wholeResponse = '';
    connection.on('data', (responseChunk) => {
      wholeResponse += responseChunk;

      let messageLimit = wholeResponse.indexOf('\n');
      while (messageLimit !== -1) {
        const response = JSON.parse(wholeResponse.substring(0, messageLimit));
        this.emit('response', response);

        wholeResponse = wholeResponse.substring(messageLimit + 1);
        messageLimit = wholeResponse.indexOf('\n');
      }
    });
  }

  public makeRequest(request: RequestType) {
    this.connection.write(JSON.stringify(request) + '\n');
  }
}