import {ReceiverServer} from './receiverServer';
import {NotesFileSystem} from './notesFileSystem';
import {ResponseType} from './connectionTypes';
import {Note, ColorChoice} from './note';


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

const notesDataBase = new NotesFileSystem();
const server = new ReceiverServer(60200);

// The server attends the clients`s petitions
server.on('request', (request, socket) => {
  const userNotes = notesDataBase.getUserNotes(request.user);
  let response: ResponseType = {
    type: 'add',
    success: false,
  };

  switch (request.type) {
    case 'add':
      if (isColor(request.color)) {
        const noteToAdd = new Note(request.title, request.body, request.color as ColorChoice);
        if (notesDataBase.addNewNote(request.user, noteToAdd) === -1) {
          response = {
            type: 'add',
            success: false,
            description: `Error, nota ${request.title} ya existente`,
          };
        } else {
          response = {
            type: 'add',
            success: true,
            description: 'Nota añadida con éxito',
          };
        }
      } else {
        response = {
          type: 'add',
          success: false,
          description: `Error: el color ${request.color} no está disponible`,
        };
      }
      break;

    case 'update':
      if (typeof userNotes === 'undefined') {
        response = {
          type: 'update',
          success: false,
          description: `Error: no se encuentra el usuario ${request.user}`,
        };
      } else {
        let note = userNotes.getNote(request.title);
        if (typeof note === 'undefined') {
          response = {
            type: 'update',
            success: false,
            description: `Error: no existe nota ${request.title} del usuario ${request.user}`,
          };
        } else {
          notesDataBase.deleteNote(request.user, request.title);
          if (typeof request.chtitle !== 'undefined') {
            note.setTitle(request.chtitle);
          }
          if (typeof request.chbody !== 'undefined') {
            note.setBody(request.chbody);
          }
          if ((typeof request.chcolor !== 'undefined') && (isColor(request.chcolor))) {
            note.setColor(request.chcolor as ColorChoice);
          }
          if (notesDataBase.addNewNote(request.user, note) === 0) {
            response = {
              type: 'update',
              success: true,
              description: `Nota modificada con éxito`,
            };
          } else {
            response = {
              type: 'update',
              success: false,
              description: `Error: error inesperado`,
            };
          }
        }
      }
      break;

    case 'remove':
      if (notesDataBase.deleteNote(request.user, request.title) === -1) {
        response = {
          type: 'remove',
          success: false,
          description: `Error: no existe ninguna nota con título ${request.title} del usuario ${request.user}`,
        };
      } else {
        response = {
          type: 'remove',
          success: true,
          description: `Nota ${request.title} eliminada con éxito`,
        };
      }
      break;

    case 'read':
      if (typeof userNotes === 'undefined') {
        response = {
          type: 'read',
          success: false,
          description: `Error: no se encuentra el usuario ${request.user}`,
        };
      } else {
        const note = userNotes.getNote(request.title);
        if (typeof note === 'undefined') {
          response = {
            type: 'read',
            success: false,
            description: `Error: no existe nota ${request.title} del usuario ${request.user}`,
          };
        } else {
          response = {
            type: 'read',
            success: true,
            notes: [note],
          };
        }
      }
      break;

    case 'list':
      if (typeof userNotes !== "undefined") {
        response = {
          type: 'list',
          success: true,
          notes: userNotes.getUserNotes(),
        };
      } else {
        response = {
          type: 'list',
          success: false,
          description: `Error: no se encuentra el usuario ${request.user}`,
        };
      }
      break;
  }
  // The server sends the response to the client
  server.sendResponse(response, socket);
});