import * as chalk from 'chalk';
import * as yargs from 'yargs';
import {ColorChoice} from "./note";
import {Note} from "./note";
import {NotesFileSystem} from "./notesFileSystem";

/**
 * Manager of the files of the users.
 */
const notesDataBase = new NotesFileSystem();

/**
 * Determines if a given color is available.
 * @param color color to be determined.
 * @returns true if its an available color, false otherwise.
 */
function isColor(color: string): color is ColorChoice {
  if ((color !== 'red') && (color !== 'blue') &&
      (color !== 'yellow') && (color !== 'green')) {
    return false;
  } else {
    return true;
  }
}

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
      if (isColor(argv.color)) {
        const noteToAdd = new Note(argv.title, argv.body, argv.color as ColorChoice);
        if (notesDataBase.addNewNote(argv.user, noteToAdd) === -1) {
          console.log(chalk.red.inverse(`Error: el usuario ${argv.user} ya tiene una nota con el mismo título`));
        } else {
          console.log(chalk.green.inverse(`Nota añadida con éxito`));
        }
      } else {
        console.log(chalk.red.inverse(`Error: el color ${argv.color} no está disponible`));
      }
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
      const userNotes = notesDataBase.getUserNotes(argv.user);
      if (typeof userNotes === 'undefined') {
        console.log(chalk.red.inverse(`Error: no se encuentra el usuario ${argv.user}`));
      } else {
        let note = userNotes.getNote(argv.title);
        if (typeof note === 'undefined') {
          console.log(chalk.red.inverse(`Error: no existe nota ${argv.title} del usuario ${argv.user}`));
        } else {
          notesDataBase.deleteNote(argv.user, argv.title);
          if (typeof argv.chtitle === 'string') {
            note.setTitle(argv.chtitle);
          }
          if (typeof argv.chbody === 'string') {
            note.setBody(argv.chbody);
          }
          if (typeof argv.chcolor === 'string') {
            if (!isColor(argv.chcolor)) {
              console.log(chalk.red.inverse(`Error: color ${argv.chcolor} no disponible`));
            } else {
              note.setColor(argv.chcolor as ColorChoice);
            }
          }
          if (notesDataBase.addNewNote(argv.user, note) === 0) {
            console.log(chalk.green.inverse(`Nota modificada con éxito`));
          } else {
            console.log(chalk.red.inverse(`Error: error inesperado al añadir la nota`));
          }
        }
      }
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
      if (notesDataBase.deleteNote(argv.user, argv.title) === -1) {
        console.log(chalk.red.inverse(`Error: no existe ninguna nota con título ${argv.title} del usuario ${argv.user}`));
      } else {
        console.log(chalk.green.inverse(`Nota eliminada con éxito`));
      }
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
      const notesToList = notesDataBase.getUserNotes(argv.user);
      if (typeof notesToList !== "undefined") {
        notesToList.getUserNotes().forEach((note) => {
          const colorToPrint = note.getColor();
          switch (colorToPrint) {
            case "blue":
              console.log(chalk.blue(`${note.getTitle()}`));
              break;
            case "red":
              console.log(chalk.red(`${note.getTitle()}`));
              break;
            case "green":
              console.log(chalk.green(`${note.getTitle()}`));
              break;
            case "yellow":
              console.log(chalk.yellow(`${note.getTitle()}`));
              break;
            default:
              console.log(chalk.red.inverse(`Error: color de la nota ${note.getTitle()} no disponible`));
              break;
          }
        });
      } else {
        console.log(chalk.red.inverse(`Error: no se encuentra el usuario ${argv.user}`));
      }
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
      const userNotes = notesDataBase.getUserNotes(argv.user);
      if (typeof userNotes === 'undefined') {
        console.log(chalk.red.inverse(`Error: no se encuentra el usuario ${argv.user}`));
      } else {
        const note = userNotes.getNote(argv.title);
        if (typeof note === 'undefined') {
          console.log(chalk.red.inverse(`Error: no existe nota ${argv.title} del usuario ${argv.user}`));
        } else {
          const colorToPrint = note.getColor();
          switch (colorToPrint) {
            case "blue":
              console.log(chalk.blue(`${note.getTitle()}`));
              console.log(chalk.blue(`${note.getBody()}`));
              break;
            case "red":
              console.log(chalk.red(`${note.getTitle()}`));
              console.log(chalk.red(`${note.getBody()}`));
              break;
            case "green":
              console.log(chalk.green(`${note.getTitle()}`));
              console.log(chalk.green(`${note.getBody()}`));
              break;
            case "yellow":
              console.log(chalk.yellow(`${note.getTitle()}`));
              console.log(chalk.yellow(`${note.getBody()}`));
              break;
            default:
              console.log(chalk.red.inverse(`Error: color de la nota ${note.getTitle()} no disponible`));
              break;
          }
        }
      }
    }
  },
});

yargs.parse();