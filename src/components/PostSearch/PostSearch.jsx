import { useEffect, useState } from 'react';
import PostSearchForm from 'components/PostSearchForm/PostSearchForm';
import PostList from 'shared/components/postList/PostList';
import { searchPosts } from './../../shared/api/posts';
import styles from './PostSearch.module.css';
import Modal from 'components/Modal/Modal';

const PostSearch = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await searchPosts(search, page);

        setItems(prevItems => [...prevItems, ...data]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchPosts();
    }
  }, [search, page]);

  const onSearch = ({ search }) => {
    setSearch(search);
    setPage(1);
    setItems([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = modalContent => {
    setModalOpen(true);
    setModalContent({ ...modalContent });
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent({
      title: '',
      body: '',
    });
  };

  const isPosts = Boolean(items.length);

  return (
    <div className={styles.container}>
      {modalOpen && (
        <Modal close={closeModal}>
          <>
            <h3>{modalContent.title}</h3>
            <p>{modalContent.body}</p>
          </>
        </Modal>
      )}
      <PostSearchForm onSubmit={onSearch} />
      {isPosts && <PostList items={items} onClick={openModal} />}
      {loading && <p>loading posts....</p>}
      {error && <p>something wrong</p>}
      {isPosts && <button onClick={loadMore}>Load more</button>}
    </div>
  );
};

export default PostSearch;
