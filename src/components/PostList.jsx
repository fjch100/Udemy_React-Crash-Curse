import { useState } from "react";
import Post from "./Post";
import classes from "./PostList.module.css";
import NewPost from './NewPost';
import Modal from "./Modal";

function PostList({ isPosting, onStopPosting }) {
    const [posts, setPosts] = useState([]);

    function addPostHandler(postData) {
        setPosts((existingPosts) => [postData, ...existingPosts]);
    }

    return (
        <>
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewPost
                        onAddPost={addPostHandler}
                        onCancel={onStopPosting}
                    />
                </Modal>
            )}
            {posts.length > 0 && <ul className={classes.posts}>
                {posts.map((post) => <Post key={post.body} author={post.author} body={post.body} />)}
            </ul>
            }
            {posts.length === 0 &&
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>THere are no posts yet.</h2>
                    <p>Start adding some!</p>
                </div>
            }

        </>
    )
}

export default PostList
