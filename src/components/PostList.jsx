import { useEffect, useState } from "react";
import Post from "./Post";
import classes from "./PostList.module.css";
import NewPost from './NewPost';
import Modal from "./Modal";

function PostList({ isPosting, onStopPosting }) {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            let response = await fetch("http://localhost:8080/posts");
            let data = await response.json();
            setPosts(data.posts);
            setIsLoading(false);
        }
        fetchData();

    }, []);

    function addPostHandler(postData) {
        fetch('http://localhost:8080/posts', {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
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
            {!isLoading && posts.length > 0 && <ul className={classes.posts}>
                {posts.map((post) => <Post key={post.body} author={post.author} body={post.body} />)}
            </ul>
            }
            {!isLoading && posts.length === 0 &&
                <div style={{ textAlign: 'center', color: 'white' }}>
                    <h2>THere are no posts yet.</h2>
                    <p>Start adding some!</p>
                </div>
            }
            {isLoading && <div style={{ textAlign: 'center', color: 'white' }}>
                <p>Loading...!</p>
            </div>}

        </>
    )
}

export default PostList
