import Cookie from "./Cookie";
import { generateID } from "./generator";

export default class Note {
  static all() {
    return Cookie.select("notes", [], true);
  }
  static create({ title, content }) {
    let noteID = generateID();
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
  }

  static update({ noteID, title, content }) {
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
}
