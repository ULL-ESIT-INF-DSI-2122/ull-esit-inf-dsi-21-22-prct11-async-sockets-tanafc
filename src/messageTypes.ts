import {Note} from './note';

/**
 * Type that defines the attributes of a request
 * from a client to the server.
 */
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
  chtitle?: string;
  chbody?: string;
  chcolor?: string;
}

/**
 * Type that defines the attributes of a reply
 * from the server to the client.
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  description?: string;
  notes?: Note[];
}

