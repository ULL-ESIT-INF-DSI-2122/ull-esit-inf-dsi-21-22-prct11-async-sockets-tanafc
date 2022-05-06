import {RequestType, ResponseType} from './connectionTypes';
import {EventEmitter} from 'events';
import * as net from 'net';

/**
 * Class that emits an event when a server replies to the request.
 * Defines methods to request a petition to the server.
 */
export class RequestClient extends EventEmitter {
  /**
   * @param connection socket where the connection with the server is made.
   */
  constructor(private connection: net.Socket) {
    super();
    // Stores the whole data send by the server.
    let wholeResponse = '';
    connection.on('data', (responseChunk) => {
      wholeResponse += responseChunk;
    });
    // When the server ends sending the reply.
    connection.on('end', () => {
      const response: ResponseType = JSON.parse(wholeResponse);
      this.emit('response', response);
    });
  }

  /**
   * Sends a request to the server. Closes half socket
   * when the request is send.
   * @param request request to send to the server.
   */
  public makeRequest(request: RequestType) {
    this.connection.write(JSON.stringify(request));
    this.connection.end();
  }
}