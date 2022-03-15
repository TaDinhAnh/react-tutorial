import { Link } from "react-router-dom"

export const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
            </Link>
            <p className="postBody">{(post.body).lenght <= 25 ? post.body : `${post.body.slice()}...`}</p>
        </article>
    )
}
