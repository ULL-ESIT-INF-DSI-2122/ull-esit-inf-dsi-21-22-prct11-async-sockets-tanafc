import * as net from 'net';
import {EventEmitter} from 'events';
import {RequestType, ResponseType} from './messageTypes';

/**
 * Class that emits an event when a client connects and makes a
 * request. Defines methods to reply to the request.
 */
export class ReceiverServer extends EventEmitter {
  /** The server attribute */
  private server: net.Server;

  /**
   * @param port where the server will listen to new connections.
   */
  constructor(port: number) {
    super();
    this.server = net.createServer({allowHalfOpen: true}, (connection) => {
      console.log('Request received from client.');
      // Stores the whole data.
      let wholeRequest = '';
      connection.on('data', (requestChunk) => {
        wholeRequest += requestChunk;
      });
      // When the client ends sending the request.
      connection.on('end', () => {
        const request: RequestType = JSON.parse(wholeRequest);
        this.emit('request', request, connection);
      });
    }).listen(port, () => {
      console.log('Waiting for clients to connect.');
    });
  }

  /**
   * Sends a response to the client from a socket.
   * Ends the connection when the reply is send.
   * @param response response to send.
   * @param socket socket to send the reply.
   */
  public sendResponse(response: ResponseType, socket: net.Socket) {
    socket.write(JSON.stringify(response));
    socket.end();
  }
}