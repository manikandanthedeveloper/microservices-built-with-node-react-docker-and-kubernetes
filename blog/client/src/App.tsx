import Header from "./Components/Header/Header"
import FormPost from "./Components/Posts/FormPost/FormPost";
import Posts from "./Components/Posts/Posts";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <FormPost />
        <Posts />
      </div>
    </>
  );
};

export default App;