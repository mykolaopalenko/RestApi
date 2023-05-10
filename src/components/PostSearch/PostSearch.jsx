import { Component } from 'react';
import PostSearchForm from 'components/PostSearchForm/PostSearchForm';
import PostList from 'shared/components/postList/PostList';
import { searchPosts } from './../../shared/api/posts';
import styles from "./PostSearch.module.css"
import Modal from 'components/Modal/Modal';

class PostSearch extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    search: '',
    page: 1,
    modalOpen: false,
    modalContent: {
      title: '',
      body: '',
    },
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if ((search && prevState.search !== search) || page > prevState.page) {
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    const { search, page } = this.state;

    this.setState({
      loading: true,
    });

    try {
      const data = await searchPosts(search, page);

      this.setState(({ items }) => ({
        items: [...items, ...data],
        loading: false,
      }));
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  onSearch = ({ search }) => {
    this.setState({
      search,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  openModal = modalContent => {
    this.setState({
      modalOpen: true,
      modalContent,
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalContent: {
        title: '',
        body: '',
      },
    });
  };

  render() {
    const { items, loading, error, modalOpen, modalContent } = this.state;
    const isPosts = Boolean(items.length);
    const { onSearch, loadMore, openModal, closeModal } = this;
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
        {isPosts && <button onClick={loadMore}> Load more</button>}
      </div>
    );
  }
}

export default PostSearch;
