import * as chalk from 'chalk';
import * as yargs from 'yargs';
import {NoteInterface} from "./note";
import {connect} from 'net';
import {RequestClient} from './requestClient';
import {ResponseType} from './connectionTypes';

// The clients allows to make petitions to the server
const client = new RequestClient(connect({port: 60200}));

// Manager when the server responds to a request
client.on('response', (serverResponse) => {
  const response: ResponseType = serverResponse;
  if (response.success === false) {
    console.log(chalk.red.inverse(response.description));
  } else {
    switch (response.type) {
      case 'list':
        const notesToList = response.notes as unknown as NoteInterface[];
        notesToList.forEach((note) => {
          const color = note.color;
          switch (color) {
            case 'blue':
              console.log(chalk.blue(note.title));
              break;
            case 'red':
              console.log(chalk.red(note.title));
              break;
            case 'yellow':
              console.log(chalk.yellow(note.title));
              break;
            case 'green':
              console.log(chalk.green(note.title));
              break;
          }
        });
        break;

      case 'read':
        const notesToRead = response.notes as unknown as NoteInterface[];
        notesToRead.forEach((note) => {
          switch (note.color) {
            case 'blue':
              console.log(chalk.blue(note.title));
              console.log(chalk.blue(note.body));
              break;
            case 'red':
              console.log(chalk.red(note.title));
              console.log(chalk.red(note.body));
              break;
            case 'yellow':
              console.log(chalk.yellow(note.title));
              console.log(chalk.yellow(note.body));
              break;
            case 'green':
              console.log(chalk.green(note.title));
              console.log(chalk.green(note.body));
              break;
          }
        });
        break;

      default:
        console.log(chalk.green.inverse(response.description));
    }
  }
});


// Add command to add a new user`s note
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
      // Petition to server
      client.makeRequest({
        type: 'add',
        user: argv.user,
        title: argv.title,
        body: argv.body,
        color: argv.color,
      });
    }
  },
});

// Modify command to modify an existing user`s note
yargs.command({
  command: 'update',
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
      // Petition to server
      client.makeRequest({
        type: 'update',
        user: argv.user,
        title: argv.title,
        chtitle: argv.chtitle as string | undefined,
        chbody: argv.chbody as string | undefined,
        chcolor: argv.chcolor as string | undefined,
      });
    }
  },
});

// Delete command to delete an existing user`s note
yargs.command({
  command: 'remove',
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
      // Petition to server
      client.makeRequest({
        type: 'remove',
        user: argv.user,
        title: argv.title,
      });
    }
  },
});

// List command to list all the existing notes of a user
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
      // Petition to server
      client.makeRequest({
        type: 'list',
        user: argv.user,
      });
    }
  },
});

// Read command to read an existing note of a user
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
      // Petition to server
      client.makeRequest({
        type: 'read',
        user: argv.user,
        title: argv.title,
      });
    }
  },
});

yargs.parse();