import React from 'react';
import PropTypes from 'prop-types';
import Shuffle from 'shufflejs';
import Post from '../post/Post';
import './PostList.scss';
import LeafLoading from '../../utils/loadings/LeafLoading';


export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.sizerElementRef = React.createRef();
    this.processing = null;
  }

  componentDidMount() {
    this.shuffle = new Shuffle(this.containerRef.current, '.post-wrapper', {
      sizer: this.sizerElementRef.current
    });
  }

  componentDidUpdate() {
    this.shuffle.resetItems();
    this.shuffle.update();
  }

  componentWillUnmount() {
    this.shuffle.destroy();
    this.shuffle = null;
  }

  shouldComponentUpdate(newProps) {
    const willUpdate = !(this.props && newProps.posts
      && newProps.posts.length === this.props.length);
    if (willUpdate) {
      this.processing = null;
    }
    return willUpdate;
  }

  // eslint-disable-next-line class-methods-use-this
  mapPreviews(posts) {
    return Promise.all(posts.map(post => new Promise((resolve) => {
      if (post.previewClass) {
        resolve(post);
        return;
      }
      if (!post.preview) {
        post.previewClass = this.smartSize(null, post);
        resolve(post);
        return;
      }
      this.processing = true;
      const image = document.createElement('img');
      image.src = post.preview;

      if (image.naturalWidth > 0 || image.complete) {
        post.previewClass = this.smartSize(image, post);
        resolve(post);
      } else {
        image.onload = () => {
          post.previewClass = this.smartSize(image, post);
          resolve(post);
        };
      }
    })));
  }

  // eslint-disable-next-line class-methods-use-this
  smartSize(image, post) {
    const contentLength = post.content.length + post.summary.length;
    if (image == null) {
      if (contentLength > 200) {
        return 'w2';
      }
      return 'w1';
    }

    const width = image.naturalWidth;
    const height = image.naturalHeight;
    const ratio = width / height;
    if (ratio > 1) { // width > height
      if (ratio > 4) {
        return 'w4';
      } if (ratio > 3) {
        return 'w3';
      } if (ratio > 2) {
        return 'w2';
      }
      return 'w1';
    } if (ratio === 1) {
      if (contentLength > 100) {
        return 'w2';
      }
      return 'w1';
    } // height > width
    if (contentLength > 300) {
      return 'w4';
    } if (contentLength > 200) {
      return 'w3';
    } if (contentLength > 100) {
      return 'w2';
    }
    return 'w1';
  }

  // eslint-disable-next-line class-methods-use-this
  renderPost(key, content, post) {
    return (
      <div
        key={key}
        className={`post-wrapper p-0 ${post.previewClass || ''}`}
      >
        <div className="p-2">
          {content}
        </div>
      </div>
    );
  }

  render() {
    const { children, posts = [] } = this.props;
    if (this.processing) return null;
    if (posts.length > 0 && this.processing === null) {
      this.mapPreviews(posts).then(() => {
        this.processing = false;
        this.forceUpdate(() => {
          this.shuffle.resetItems();
          this.shuffle.update();
        });
      });
    }
    return (
      <React.Fragment>
        {(!posts || !posts.length) && (
          <div className="overlapable" style={{ width: '100%', height: '200px' }}>
            <LeafLoading overlaping />
          </div>
        )}
        <div ref={this.containerRef}>
          <div className="sizer-element" ref={this.sizerElementRef} />
          <div className="post-wrapper w4 p-0" />
          {(posts && posts.map(post => (
            this.renderPost(post._id, <Post post={post} />, post)
          )))
          || (children && children.map(post => (
            this.renderPost(post.key, post, post.props.post)
          )))
          }
        </div>
      </React.Fragment>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array
};

PostList.defaultProps = {
  posts: undefined
};