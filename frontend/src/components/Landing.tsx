import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-1000 sm:py-24 lg:py-36 dark:bg-gray-1000">
      <div className="container flex flex-col items-center space-y-4 text-center px-4 md:px-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl/tight">
            Your data, your control.
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Blob is the secure, private, and easy-to-use platform for managing
            your data. Take control of your information with seamless
            integration across your devices.
          </p>
        </div>
        <div className="grid max-w-[700px] gap-4">
          <Link to={"/signup"}
            className="flex h-10 items-center justify-center rounded-md border border-gray-200  bg-white shadow-sm text-sm w-[200px] mx-auto transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
          >
            Sign Up
          </Link>
  
        </div>
      </div>
    </div>
  );
}
