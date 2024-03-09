import { SignInput } from "@rimaru06/medium-common";
import { ChangeEvent, ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
// trpc lern
const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
  const [postinputs, setpostInput] = useState<SignInput>({
    name: "",
    username: "",
    password: "",
  });
   async function sendRequest()
  {
    try {
       const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,postinputs);
       const jwt = response.data;
       localStorage.setItem("token",jwt.jwt);
       navigate("/blogs")
    } catch (error) {
        console.log(error)
    }
    
  }
  return (
    <div className="h-screen flex flex-col justify-center   items-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-2xl text-center font-extrabold ">
              {type === "signup" ? "Create an Acocunt" : "SIGN IN"}
            </div>
            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="text-blue-500 underline"
              >
                {" "}
                {type === "signin" ? "Sign Up" : "Sign In"}
              </Link>
            </div>
          </div>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Shiva chahar..."
                onchange={(e) => {
                  setpostInput({ ...postinputs, name: e.target.value });
                }}
              />
            ) : null}
            <LabelledInput
              label="username"
              placeholder="Shiva@gmail.com"
              onchange={(e) => {
                setpostInput({ ...postinputs, username: e.target.value });
              }}
            />
            <LabelledInput
              label="password"
              placeholder="********"
              onchange={(e) => {
                setpostInput({ ...postinputs, password: e.target.value });
              }}
              type="password"
            />
            <button
              onClick={sendRequest}
              type="button"
              className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputypes {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onchange,
  type,
}: LabelledInputypes): ReactNode {
  return (
    <div>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-semibold text-black
        pt-4"
      >
        {label}
      </label>
      <input
        onChange={onchange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
