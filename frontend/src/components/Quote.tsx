const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg ">
          <div className="text-3xl font-bold">
            "The only way to do great work is to love what you do. If you
            haven't found it yet, keep looking. Don't settle. As with all
            matters of the heart, you'll know when you find it."
          </div>
          <div className="max-w-md  text-xl font-semibold mt-4 ">
            Shiva Chahar
          </div>
          <div className="max-w-md  text-xs font-light text-slate-400 ">
            Developer
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote