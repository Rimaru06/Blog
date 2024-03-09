import { useEffect } from "react";
import Appbar from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import BlogSkeloton from "../components/BlogSkeloton";
import { useBlog } from "../hooks";
import { useNavigate } from "react-router-dom";


const Blogs = () => {
  const navigate = useNavigate();
  const  {loading , blogs} = useBlog();
  useEffect(()=> {
    if(!localStorage.getItem("token"))
    {
      navigate("/signin");
    }
  }, [])

  if(loading) return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center ">
        <BlogSkeloton />
        <BlogSkeloton />
        <BlogSkeloton />
        <BlogSkeloton />
      </div>
    </div>
  );



  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => 
            <BlogCard key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate="2nd feb 2024"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs