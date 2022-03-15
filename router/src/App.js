import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from "date-fns";
import api from './api/posts';
import EditPost from './EditPost';
function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const history = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/post')
        setPosts(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else {
          console.log(`Error: ${error.message}`)
        }
      }
    }
    fetchPosts();
  }, [])
  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchResult(filteredResults.reverse());
  }, [posts, search]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime: datetime, body: postBody };
    try {
      const response = await api.post('/post', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history('/');
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatePost = { id, title: editTitle, datetime: datetime, body: editBody };
    try {
      const response = await api.put(`/post/${id}`, updatePost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditBody('');
      setEditTitle('');
      history('/');
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }
  const handleDelete = async (id) => {
    try {
      await api.delete(`/post/${id}`);
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      history('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }

  }
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home posts={searchResult} />} />
        <Route path='/post' element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        } />
        <Route path='/edit/:id' element={
          <EditPost
            handleEdit={handleEdit}
            posts={posts}
            editTitle={editTitle}
            setEditBody={setEditBody}
            editBody={editBody}
            setEditTitle={setEditTitle}
          />
        } />
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
