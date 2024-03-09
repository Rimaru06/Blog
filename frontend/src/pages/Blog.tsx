import { useRecoilStateLoadable } from "recoil";
import { blogAtom } from "../store/atom";
import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import BlogSkeloton from "../components/BlogSkeloton";
import Appbar from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Blog = () => {
    const navigate = useNavigate();
      useEffect(() => {
        if (!localStorage.getItem("token")) {
          navigate("/signin");
        }
      }, []);
    const id = useParams().id || "";
  const [blog] = useRecoilStateLoadable(blogAtom(id));
  if (blog.state === "loading") return (
    <div>
      <Appbar />
    <div className="flex justify-center items-center">
      <BlogSkeloton />
    </div>
    </div>
  );
  if (blog.state === "hasError") return <div>Error</div>;
  return <div>
    <FullBlog blog={blog.contents} />
  </div>;
};

export default Blog;