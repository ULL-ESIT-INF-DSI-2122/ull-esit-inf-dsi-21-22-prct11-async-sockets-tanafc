import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/note';

describe('Note class function tests', () => {
  let note = new Note("New Note", "Content of Note", "blue");

  it('It creates a new instance of an object with class Note', () => {
    expect(note).to.be.instanceOf(Note);
  });

  it('It has an attribute for its title', () => {
    expect(note.getTitle()).to.be.equal("New Note");
  });

  it('It has an attribute for its body', () => {
    expect(note.getBody()).to.be.equal("Content of Note");
  });

  it('It has an attribute for its color', () => {
    expect(note.getColor()).to.be.equal("blue");
  });

  it('It has a setter for its title', () => {
    note.setTitle("Modified title");
    expect(note.getTitle()).to.be.equal("Modified title");
  });

  it('It has a setter for its body', () => {
    note.setBody("Modified body");
    expect(note.getBody()).to.be.equal("Modified body");
  });

  it('It has a setter for its color', () => {
    note.setColor("green");
    expect(note.getColor()).to.be.equal("green");
  });
});