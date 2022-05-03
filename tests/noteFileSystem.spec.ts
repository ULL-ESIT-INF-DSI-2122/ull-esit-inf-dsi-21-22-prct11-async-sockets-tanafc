import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note';
import {UserNotes} from '../src/userNotes';
import {NotesFileSystem} from '../src/notesFileSystem';

describe('NoteFileSystem class function tests', () => {
  const notesDataBase = new NotesFileSystem();

  it('It creates a new instance of an object with class NoteFileSystem', () => {
    expect(notesDataBase).to.be.instanceOf(NotesFileSystem);
  });

  it('It has an attribute for its users`s notes', () => {
    expect(notesDataBase.getUsersNotes().length).to.be.above(0);
  });

  it('It has a method to get a specific users`s note', () => {
    expect(notesDataBase.getUserNotes("john")).to.be.instanceOf(UserNotes);
    expect(notesDataBase.getUserNotes("NOT A USER")).to.be.equal(undefined);
  });

  it('It has a method to add a new user`s note', () => {
    const note = new Note("Green Note", "Content", "green");
    expect(notesDataBase.addNewNote("john", note)).to.be.equal(0);
    expect(notesDataBase.addNewNote("john", note)).to.be.equal(-1);
  });

  it('It has a method to delete user`s note', () => {
    expect(notesDataBase.deleteNote("john", "Green Note")).to.be.equal(0);
    expect(notesDataBase.deleteNote("john", "Green Note")).to.be.equal(-1);
  });
});