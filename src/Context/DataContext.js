import { createContext, useState, useEffect } from "react";


import { format } from "date-fns";
// import {Link} from "react-router-dom"

import { useNavigate } from "react-router-dom";
import api from "../api/posts";

//  CUSTOM HOOKS
import useWindowSize from "../Hooks/useWindowSize";
import useAxiosFetch from "../Hooks/useAxiosFetch";


// Datacontext is a variable
const DataContext = createContext({});

// Creating a method with arrow fn
export const DataProvider = ({ children }) => {
  // For the Default posts, below inside usestate contain "array objects"

  const [posts, setPosts] = useState([]);
  // {
  //   id: 1,
  //   title: "My First Post",
  //   datetime: "july 01,2022 11:17:33 AM",
  //   body: "Made a video about Tesla Q1 results",
  // },
  // {
  //   id: 2,
  //   title: "My 2nd Post",
  //   datetime: "july 01,2022 11:17:33 AM",
  //   body: "I attended a Defi(Decentralized_Finance) blockchain event",
  // },
  // {
  //   id: 3,
  //   title: "My 3rd Post",
  //   datetime: "july 01,2022 11:17:33 AM",
  //   body: "Web3 global summit next week",
  // },
  // {
  //   id: 4,
  //   title: "My 4th Post",
  //   datetime: "july 01,2022 11:17:33 AM",
  //   body: "ETH will outperform BTC",
  // },
  // ]);

  // Array Destructuring function
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  // CUSTOM HOOKS
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3600/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  // FOR 1ST TIME DATA LOADING use USE_EFFECT and to use API

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         // Not in the 200 response range
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error : ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase)
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };
  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        posts,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        handleDelete,
      }}
    >
      {/* Below is a Parameter */}
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
