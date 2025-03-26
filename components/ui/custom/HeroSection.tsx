function HeroSection() {
  return (
    <div className="h-screen w-full pt-14 bg-transparent">
      <div className="flex flex-col items-center pt-[180]">
        <div className="text-center">
          <h1 className="text-[43px] font-extrabold">
            What do you want to build?
          </h1>
          <h3 className="text-gray-400">
            Prompt, run, edit, and deploy full-stack{" "}
            <span className="text-white">web</span> and{" "}
            <span className="text-white">mobile</span> apps.
          </h3>
        </div>
        <div className=" w-[500px] h-[150px] mt-8 flex flex-col items-center bg-radial-gradient p-[1px] rounded-lg relative">
          <textarea
            placeholder="How can Bolt help you today-?"
            className="focus:outline-none w-full h-full p-4 resize-none text-sm placeholder:text-gray-500 bg-neutral-950 rounded-lg"
          ></textarea>
          {/* file upload */}
          <div></div>
          {/* push */}
          <div></div>
          {/* Gradiants */}
          <div>
            {/* <div className=" w-[500] h-[500] absolute -bottom-24 right-36 bg-gradiant-blue-spot-2 bg-background"></div>
            <div></div> */}
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
