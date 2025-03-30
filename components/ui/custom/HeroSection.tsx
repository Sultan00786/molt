import GradiantTextarea from "./GradiantTextarea";

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
        <div className=" mt-8">
          <GradiantTextarea classNames="w-[500px] h-[150px]" />
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
