import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    // FRAGMENT TAG
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
