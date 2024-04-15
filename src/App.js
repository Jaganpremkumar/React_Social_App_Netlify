import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";

// CONTEXT API
import { DataProvider } from "./Context/DataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="JPK's Social Media App" />
        {/* Prop drilling  */}
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="post">
            <Route index element={<NewPost />} />

            <Route path=":id" element={<PostPage />} />
          </Route>

          <Route path="/edit/:id" element={<EditPost />} />

          <Route path="about" element={<About />} />

          <Route path="*" element={<Missing />} />
        </Routes>

        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
