import * as chalk from 'chalk';
import * as yargs from 'yargs';
import {ColorChoice} from "./note";
import {connect} from 'net';
import {RequestClient} from './clientNotes';
import {Note} from "./note";
import {NotesFileSystem} from "./notesFileSystem";
import {RequestType, ResponseType} from './serverMessages';


const client = new RequestClient(connect({port: 60300}));

client.on('response', (response) => {
  console.log(`Respuesta ${response.type} recibida`);
  // const parsed = JSON.parse(response);
});

/** Add command to add a new user`s note */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.body === 'string') &&
        (typeof argv.color === 'string' && (typeof argv.user === 'string'))) {
      // Realizar petición
      console.log("Enviando petición");
      client.makeRequest({type: "add"});
    }
  },
});

/** Modify command to modify an existing user`s note */
yargs.command({
  command: 'modify',
  describe: 'Modify an existing note',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title of the note to modify',
      demandOption: true,
      type: 'string',
    },
    chtitle: {
      describe: 'New title of the note',
      demandOption: false,
      type: 'string',
    },
    chbody: {
      describe: 'New body of the note',
      demandOption: false,
      type: 'string',
    },
    chcolor: {
      describe: 'New body of the note',
      demandOption: false,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
      // Realizar petición
      client.makeRequest({type: 'update'});
    }
  },
});

/** Delete command to delete an existing user`s note */
yargs.command({
  command: 'delete',
  describe: 'Delete an existing note',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title of the note to delete',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
      // Realizar petición
      client.makeRequest({type: 'remove'});
    }
  },
});

/** List command to list all the existing notes of a user */
yargs.command({
  command: 'list',
  describe: 'Lists all the existing notes of the user',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      // Realizar petición
      client.makeRequest({type: 'list'});
    }
  },
});

/** Read command to read an existing note of a user */
yargs.command({
  command: 'read',
  describe: 'Read an existing note of the user',
  builder: {
    user: {
      describe: 'Name of the user',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Title of the note to read',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if ((typeof argv.title === 'string') && (typeof argv.user === 'string')) {
      // Realizar petición
      client.makeRequest({type: 'read'});
    }
  },
});

yargs.parse();