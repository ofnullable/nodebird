import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postContent }) => {
  return (
    <div>
      {postContent.split(/(#[^\s]+)/g).map(v => {
        if (v.match(/#[^\s]+/)) {
          return (
            <Link
              href={{
                pathname: `/hashtag`,
                query: { tag: v.slice(1) },
              }}
              as={`/hashtag/${v.slice(1)}`}
              key={v}
            >
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postContent: PropTypes.string.isRequired,
};

export default PostCardContent;
