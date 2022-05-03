import {ColorChoice} from './note';
import {Note} from './note';

export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  title?: string;
  body?: string;
  color?: ColorChoice;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Note[];
}

