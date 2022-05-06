/**
 * Type to define the available colors of a note
 */
export type ColorChoice = "yellow" | "red" | "blue" | "green";

/**
 * Interface that represents a series of attributes of a Note
 */
export interface NoteInterface {
  title: string;
  body: string;
  color: ColorChoice;
}

/**
 * Class to represent a Note and its basic attributes
 */
export class Note {
  /**
   * @param title Title of the note
   * @param body Body of the note
   * @param color Color of type ColorChoice for the note
   */
  constructor(private title: string, private body: string,
    private color: ColorChoice) {}

  /**
   * @returns The title of the note
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * @returns The body of the note
   */
  public getBody(): string {
    return this.body;
  }

  /**
   * @returns The color of the note
   */
  public getColor(): ColorChoice {
    return this.color;
  }

  /**
   * Sets a new title for the note
   * @param newTitle title for the note
   */
  public setTitle(newTitle: string): void {
    this.title = newTitle;
  }

  /**
   * Sets a new body for the note
   * @param newBody body for the note
   */
  public setBody(newBody: string): void {
    this.body = newBody;
  }

  /**
   * Sets a new color for the note
   * @param newColor color for the note
   */
  public setColor(newColor: ColorChoice): void {
    this.color = newColor;
  }
}