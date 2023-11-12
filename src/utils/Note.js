import Cookie from "./Cookie";
import Crypto from "./Crypto";
import { generateID } from "./generator";

export default class Note {
  static all() {
    return Cookie.select("notes", [{}], true);
  }
  static create({ noteID = generateID(), title, content }) {
    try {
      let newNoteTemplate = {
        noteID: noteID,
        title: title || "untitled",
        content: content,
        updated_at: new Date(),
        created_at: new Date(),
      };

      if (Cookie.check("notes")) {
        let items = Note.all();
        items.push(newNoteTemplate);

        Cookie.insert("notes", items, true);
      } else {
        Cookie.insert("notes", [newNoteTemplate], true);
      }
      return newNoteTemplate;
    } catch (error) {
      console.error("create method");
      throw error;
    }
  }

  static insert(noteID, item) {
    try {
      if (Note.show(noteID)) {
        Note.update(item);
      } else {
        Note.create(item);
      }
    } catch (error) {
      throw error;
    }
  }
  static update({ noteID, title, content }) {
    try {
      if (!title && content) title = "untitled";

      let notes = Note.all();

      for (let i = 0; i < notes.length; i++) {
        let note = notes[i];

        if (note.noteID === noteID) {
          notes[i] = {
            noteID,
            title: title,
            content: content,
            updated_at: new Date(),
          };

          Cookie.insert("notes", notes, true);
          return note[i];
        }
      }

      return false;
    } catch (err) {
      console.error("update method");
      throw err;
    }
  }

  static show(noteID) {
    let items = Note.all();

    for (let item of items) {
      if (item.noteID === noteID) return item;
    }

    return null;
  }

  static find(query) {
    let items = Note.all();
    let result = [];

    for (let item of items) {
      if (
        item.noteID.search(query) > -1 ||
        item.title.search(query) > -1 ||
        item.content.search(query) > -1
      )
        result.push(item);
    }

    return result;
  }

  static select(noteID) {
    let items = Note.all();

    for (let item of items) {
      if (item.noteID === noteID) return item;
    }

    throw new Error(`note with id ${noteID} doesn't exists !`);
  }

  static backup(noteID, key) {
    let note = Note.select(noteID);

    for (let key in note) {
      note[key] = note[key].trim();
    }
    return Crypto.encrypt(JSON.stringify(note), key);
  }
}
