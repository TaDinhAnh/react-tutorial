
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
const EditPost = ({ posts, handleEdit, editBody, editTitle, setEditBody, setEditTitle }) => {
    const { id } = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    useEffect(() => {
        if (post) {
            setEditBody(post.body);
            setEditTitle(post.title)
        }
    }, post, setEditTitle, setEditBody);
    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='postTitle'>Title: </label>
                        <input
                            id='postTitle'
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        ></input>
                        <label htmlFor='postBody'>Post: </label>
                        <textarea
                            id='postBody'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        ></textarea>
                        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            } {!post &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to="/">Visit Our HomePage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost
