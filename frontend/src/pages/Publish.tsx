import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
    const navigate = useNavigate();
    useEffect(()=> {
      if(!localStorage.getItem("token"))
      {
        navigate("/signin");
      }
    })
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div>
      <Appbar />
      <div className="flex  justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            id="helper-text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />
          <TextEditor onchange={(e) => {
            setContent(e.target.value);
          }} />
          <button
            onClick={async () => {
               const res =  await axios.post(`${BACKEND_URL}/api/v1/blog`,
                {
                    title,
                    content
                },
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                }
                )
                navigate(`/blog/${res.data.id}`)
            }}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onchange,
}: {
  onchange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      {" "}
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-2">
        <div className="px-4 py-2 bg-white rounded-b-lg ">
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            onChange={onchange}
            id="editor"
            rows={8}
            className="outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
            placeholder="Write an article..."
            required
          />
        </div>
      </div>
    </div>
  );
}

export default Publish;
