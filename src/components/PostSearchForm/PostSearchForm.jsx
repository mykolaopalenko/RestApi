import initialState from './initialState';
import fields from './fields';
import useForm from 'shared/hooks/useForm';
import TextField from './../../shared/components/TextField/TextField';
import styles from './PostSearchForm.module.css';

const PostSearchForm = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { search } = state;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        value={search}
        handleChange={handleChange}
        {...fields.search}
      />
      <button className={styles.btn}>Знайти</button>
    </form>
  );
};

export default PostSearchForm;

PostSearchForm.defaultProps = {
  onSubmit: () => {},
};
