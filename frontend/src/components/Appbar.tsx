import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center cursor-pointer"
      >
        Medium
      </Link>
      <div>
        <button
          onClick={() => {
            console.log("andar to aa gaya");
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Logout
        </button>

        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            New
          </button>
        </Link>
        <Avatar size={"big"} name="A" />
      </div>
    </div>
  );
}

export default Appbar