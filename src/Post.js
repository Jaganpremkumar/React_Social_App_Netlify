import React from "react";
import {Link} from "react-router-dom";

const Post = ({ post }) => {
  // Check if the post object is defined
  if (!post) {
    return ;
  }

  // Check if the required properties are present in the post object
  // if (!post.title || !post.datetime || !post.body) {
  //   return <div>Invalid post data.</div>;
  // }

  return (
    <article className="post">
      <Link to={`post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="postDate">{post.datetime}</p>
      </Link>
      <p className="postBody">
        {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
