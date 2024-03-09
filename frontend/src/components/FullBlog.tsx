import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";
interface Blog {
  blog: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
    };
  };
}
const FullBlog = (blog: Blog) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full     max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.blog.title}</div>
            <div className="text-slate-500 pt-2">post on 2nd feb 2034</div>
            <div className="pt-4 text-slate-500">{blog.blog.content}</div>
          </div>
          <div className=" col-span-4">
            <div className="text-slate-600 text-lg">
            Author
            </div>
            <div className="flex">
                <div className="pr-4 flex flex-col justify-center">
                <Avatar  size="big" name={blog.blog.author.name} />
                </div>
              <div>
                <div className="text-xl font-bold">{blog.blog.author.name}</div>
                <div className="pt-2 text-slate-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                  dolores magnam reprehenderit iste, quod nemo!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
