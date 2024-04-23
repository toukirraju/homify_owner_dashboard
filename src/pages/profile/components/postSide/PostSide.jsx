import "./PostSide.css";
import Posts from "../../../../Components/postComponents/posts/Posts";

const PostSide = () => {
  return (
    <>
      <div className="card headerContainer" style={{ marginBottom: "5px" }}>
        <h3 className="title">All Posts</h3>
        <i className="uil uil-angle-double-up scrollUp__icon"></i>
      </div>
      <div className="PostSide">
        <Posts />
      </div>
    </>
  );
};

export default PostSide;
