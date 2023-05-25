import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './Notes.module.css';
import AddNote from './addNote/addNote';
import NoteList from './noteList/noteList';

class Notes extends Component {
  state = {
    notes: [
      { id: '1', title: 'React', text: 'react is awesome' },
      { id: '2', title: 'Html', text: 'html is incredible' },
      { id: '3', title: 'Node', text: 'node is wonderful' },
      { id: '4', title: 'js', text: 'js is indispansable' },
    ],
    filter: '',
  };

  componentDidMount() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes?.length) {
      this.setState({
        notes,
      });
    }
  }

  componentDidUpdate(prevProps,  prevState) {
    const { notes } = this.state;

    if (prevState.notes.length !== notes.length) {
      console.log("update")
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }

  addNote = data => {
    this.setState(prevState => {
      const newNote = {
        id: nanoid(),
        ...data,
      };

      return {
        notes: [...prevState.notes, newNote],
      };
    });
  };

  removeNote = id => {
    this.setState(({ notes }) => {
      const newNotes = notes.filter(item => item.id !== id);

      return {
        notes: newNotes,
      };
    });
  };

  handleFilter = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  getFindNotes() {
    const { notes, filter } = this.state;

    if (!notes) {
      return notes;
    }

    const normalizeFilter = filter.toLocaleLowerCase();

    const filteredNotes = notes.filter(({ title, text }) => {
      const normalizeTitle = title.toLocaleLowerCase();
      const normalizeText = text.toLocaleLowerCase();
      const result =
        normalizeTitle.includes(normalizeFilter) ||
        normalizeText.includes(normalizeFilter);
      return result;
    });

    return filteredNotes;
  }

  render() {
    const { addNote, removeNote, handleFilter } = this;
    const notes = this.getFindNotes();

    return (
      <div>
        <div className={styles.noteBlock}>
          <AddNote onSubmit={addNote} />
          <input
            className={styles.filterFild}
            name="filter"
            onChange={handleFilter}
            placeholder="Знайти"
          />
        </div>
        <div>
          <NoteList items={notes} removeNote={removeNote} />
        </div>
      </div>
    );
  }
}
export default Notes;
