import { useState } from 'react';
import MainHeader from "./components/MainHeader";
import PostList from "./components/PostList";

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function modalHideHandler() {
    setModalIsVisible(false);
  }
  function modalShowHandler() {
    setModalIsVisible(true);
  }

  return (
    <>
      <MainHeader onCreatePost={modalShowHandler} />
      <main>
        <PostList isPosting={modalIsVisible} onStopPosting={modalHideHandler} />
      </main>
    </>
  );
}

export default App;
