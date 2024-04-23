import "./Posts.css";
import Post from "../Post/Post";
import { useFetchPostsQuery } from "../../../redux/features/post/RTK Query/postApi";
import { Loader } from "@mantine/core";
import ErrorMessage from "../../ErrorMessage";

const Posts = () => {
  const { data: posts = [], isLoading, isError } = useFetchPostsQuery();

  //decide what to render
  let content = null;
  if (isLoading && !isError) {
    content = (
      <div className="mx-auto flex h-full flex-col items-center justify-center">
        <Loader color="cyan" variant="bars" size="lg" />
      </div>
    );
  }

  if (!isLoading && isError) {
    content = (
      <ErrorMessage message={"Somthing went wrong to fetching posts"} />
    );
  }

  if (!isLoading && !isError && posts.length === 0) {
    content = <h1>No post found!</h1>;
  }
  if (!isLoading && !isError && posts.length > 0) {
    content = posts.map((post, idx) => <Post key={idx} data={post} />);
  }

  return <div className="Posts relative">{content}</div>;
};

export default Posts;
