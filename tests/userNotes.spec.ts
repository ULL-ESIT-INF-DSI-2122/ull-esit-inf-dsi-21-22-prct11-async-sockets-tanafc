import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note';
import {UserNotes} from '../src/userNotes';

describe('UserNotes class function tests', () => {
  let note1 = new Note("Blue Note", "Content of Blue Note", "blue");
  let note2 = new Note("Red Note", "Content of Red Note", "red");
  let userNotes = new UserNotes("John", [note1, note2]);

  it('It creates a new instance of an object with class UserNotes', () => {
    expect(userNotes).to.be.instanceOf(UserNotes);
  });

  it('It has an attribute for its username', () => {
    expect(userNotes.getUserName()).to.be.equal("John");
  });

  it('It has an attribute for its notes', () => {
    expect(userNotes.getUserNotes()).to.be.eql([note1, note2]);
  });

  it('It has a method to get a specific note', () => {
    expect(userNotes.getNote("Blue Note")).to.be.eql(note1);
    expect(userNotes.getNote("Black Note")).to.be.equal(undefined);
  });

  it('It has a method to add a new note', () => {
    let note3 = new Note("Green Note", "Content of Green Note", "green");
    expect(userNotes.addNote(note3)).to.equal(0);
    expect(userNotes.getNote("Green Note")).to.be.eql(note3);
    expect(userNotes.addNote(note3)).to.equal(-1);
  });

  it('It has a method to delete a new note', () => {
    expect(userNotes.deleteNote("Green Note")).to.equal(0);
    expect(userNotes.getUserNotes()).to.be.eql([note1, note2]);
    expect(userNotes.deleteNote("Green Note")).to.equal(-1);
  });
});