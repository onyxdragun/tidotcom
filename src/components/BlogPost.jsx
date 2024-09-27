import React from 'react';

const BlogPost = ({post}) => {
  return (
    <a
      className="blogposts__post"
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p className="blogposts__title">{post.title.rendered}</p>
      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
        <img
          className="blogposts__img"
          src={post._embedded['wp:featuredmedia'][0].source_url}
        />
      )}
    </a>
  )
};

export default BlogPost