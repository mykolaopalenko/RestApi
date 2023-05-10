import styles from './postList.module.css';

const PostList = ({ items, onClick }) => {
  const elements = items.map(({ id, title, body }) => (
    <li key={id} className={styles.item} onClick={() => onClick({ title, body })}>
      {title}
    </li>
  ));
  return <ul className={styles.list}>{elements}</ul>;
};

export default PostList;

PostList.defaultProps = {
  items: [],
};
