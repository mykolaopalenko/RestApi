import styles from './TextFiekd.module.css';

const TextField = ({
  id,
  value,
  label,
  name,
  handleChange,
  type,
  className,
  placeholder,
}) => {
  return (
    <div className={styles.formGroup}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
        className={styles.field}
        placeholder={placeholder}
        type={type}
        autoFocus
        required
      ></input>
    </div>
  );
};

export default TextField;
