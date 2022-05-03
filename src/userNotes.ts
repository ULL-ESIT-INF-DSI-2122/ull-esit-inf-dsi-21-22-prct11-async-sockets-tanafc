import {ColorChoice} from "./note";
import {Note} from "./note";

/**
 * Class to define the attributes of a user`s notes
 */
export class UserNotes {
  /** Array that defines notes of the user */
  private userNotes: Note[];
  /** Name of the user */
  private userName: string;

  /**
   * @param name Name of the user
   * @param notes Notes of the user, if none is given,
   * its initialized as an empty array
   */
  constructor(name: string, notes: Note[] = []) {
    this.userName = name;
    this.userNotes = notes;
  }

  /**
   * @returns The username of the notes
   */
  public getUserName(): string {
    return this.userName;
  }

  /**
   * @returns The notes of the user
   */
  public getUserNotes(): Note[] {
    return this.userNotes;
  }

  /**
   * Adds a new note to the collection of notes of the user
   * @param newNote new note to add to the collection
   * @returns -1 if a note with the same title has already
   * been included, 0 otherwise.
   */
  public addNote(newNote: Note): number {
    for (let i = 0; i < this.userNotes.length; i++) {
      if (this.userNotes[i].getTitle() === newNote.getTitle()) {
        return -1;
      }
    }
    this.userNotes.push(newNote);
    return 0;
  }

  /**
   * Deletes an existing note in the user`s collection
   * @param title title of the note to delete
   * @returns 0 if the note was successfully deleted, -1 otherwise.
   */
  public deleteNote(title: string): number {
    for (let i = 0; i < this.userNotes.length; i++) {
      if (this.userNotes[i].getTitle() === title) {
        this.userNotes.splice(i, 1);
        return 0;
      }
    }
    return -1;
  }

  /**
   * Gets a determined note given the title
   * @param title title of the note to return
   * @returns the note. If the title does not match any
   * note, returns undefined.
   */
  public getNote(title: string): Note | undefined {
    for (let i = 0; i < this.userNotes.length; i++) {
      if (this.userNotes[i].getTitle() === title) {
        return this.userNotes[i];
      }
    }
    return undefined;
  }
}