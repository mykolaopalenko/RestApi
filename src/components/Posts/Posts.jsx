import { useState, useEffect } from 'react';
import styles from './Posts.module.css';
import { getPosts } from 'shared/api/posts';
import PostList from 'shared/components/postList/PostList';
import Modal from 'components/Modal/Modal';

const modalInitialState = {
  title: '',
  body: '',
};
const Posts = () => {
  const [posts, setPosts] = useState({
    items: [],
    loading: false,
    error: null,
  });
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    ...modalInitialState,
  });

  useEffect(() => {
    const FetchPosts = async () => {
      try {
        setPosts(prevPosts => ({
          ...prevPosts,
          loading: true,
        }));
        const data = await getPosts(page);
        setPosts(prevPosts => ({
          ...prevPosts,
          items: [...prevPosts.items, ...data],
        }));
      } catch (error) {
        setPosts(prevPosts => ({
          ...prevPosts,
          error,
        }));
      } finally {
        setPosts(prevPosts => ({
          ...prevPosts,
          loading: false,
        }));
      }
    };

    FetchPosts();
  }, [setPosts, page]);

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
      ...modalInitialState,
    });
  };

  const { items, loading, error } = posts;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Список постів </h2>
      {Boolean(items.length) && <PostList items={items} onClick={openModal} />}
      {Boolean(items.length) && <button onClick={loadMore}> Load more</button>}
      {loading && <p>loading posts....</p>}
      {error && <p>something wrong</p>}{' '}
      {modalOpen && (
        <Modal close={closeModal}>
          <>
            <h3>{modalContent.title}</h3>
            <p>{modalContent.body}</p>
          </>
        </Modal>
      )}
    </div>
  );
};

// class Posts extends Component {
//   state = {
//     items: [],
//     loading: false,
//     error: null,
//     page: 1,
//     modalOpen: false,
//     modalContent: {
//       title: '',
//       body: '',
//     },
//   };

//   componentDidMount() {
//     this.fetchPosts();
//   }

//   componentDidUpdate(_, prevState) {
//     const { page } = this.state;

//     if (prevState.page !== page) {
//       this.fetchPosts();
//     }
//   }

//   async fetchPosts() {
//     const { page } = this.state;

//     this.setState({
//       loading: true,
//     });

//     try {
//       const data = await getPosts(page);

//       this.setState(({ items }) => ({
//         items: [...items, ...data],
//         loading: false,
//       }));
//     } catch (error) {
//       this.setState({
//         error,
//       });
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   loadMore = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   openModal = modalContent => {
//     this.setState({
//       modalOpen: true,
//       modalContent,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       modalOpen: false,
//       modalContent: {
//         title: '',
//         body: '',
//       },
//     });
//   };

//   render() {
//     const { items, loading, error, modalOpen, modalContent } = this.state;
//     const { loadMore, openModal, closeModal } = this;
//     const isPosts = Boolean(items.length);
//     return (
//       <div className={styles.container}>
//         <h2 className={styles.title}> Список постів </h2>
//         {modalOpen && (
//           <Modal close={closeModal}>
//             <>
//               <h3>{modalContent.title}</h3>
//               <p>{modalContent.body}</p>
//             </>
//           </Modal>
//         )}

//         {isPosts && <PostList items={items} onClick={openModal} />}
//         {loading && <p>loading posts....</p>}
//         {error && <p>something wrong</p>}
//         {isPosts && <button onClick={loadMore}> Load more</button>}
//       </div>
//     );
//   }
// }

export default Posts;
