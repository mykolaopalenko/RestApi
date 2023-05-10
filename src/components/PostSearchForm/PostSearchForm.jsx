import { Component } from 'react';
import initialState from './initialState';
import fields from './fields';
import { nanoid } from 'nanoid';

import TextField from './../../shared/components/TextField/TextField';
import styles from './PostSearchForm.module.css';

class PostSearchForm extends Component {
  state = { ...initialState };

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
      search: '',
    });
  }

  searchId = nanoid();

  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit, searchId } = this;

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          value={search}
          id={searchId}
          handleChange={handleChange}
          {...fields.search}

        />
        <button className={styles.btn}>Знайти</button>
      </form>
    );
  }
}

export default PostSearchForm;

PostSearchForm.defaultProps = {
  onSubmit: () => {},
};
