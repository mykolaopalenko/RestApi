import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './addNote.module.css';

class AddNote extends Component {
  state = {
    title: '',
    text: '',
  };

  titleId = nanoid();
  textId = nanoid();

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({
      title: '',
      text: '',
    });
  }

  render() {
    const { handleChange, handleSubmit, titleId, textId } = this;
    const { title, text } = this.state;
    return (
      <form onSubmit={handleSubmit} className={styles.noteForm}>
        <div className={styles.formGroup}>
          <label htmlFor={titleId}>Заголовок</label>
          <input
            id={titleId}
            value={title}
            name="title"
            onChange={handleChange}
            className={styles.field}
            placeholder="Напишіть заголовок"
            type="text"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={textId}>Нотатка</label>
          <input
            id={textId}
            value={text}
            name="text"
            onChange={handleChange}
            className={styles.field}
            placeholder="Напишіть нотатку"
            type="text"
            required
          />
        </div>
        <button className={styles.btn}>Добавити нотатку</button>
      </form>
    );
  }
}

export default AddNote;

AddNote.defaultProps = {
  onSubmit: () => {},
};

AddNote.propTypes = {
  onSubmit: PropTypes.func,
};
