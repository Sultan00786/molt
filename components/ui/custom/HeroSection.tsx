import GradiantTextarea from "./GradiantTextarea";

function HeroSection() {
  return (
    <div className="h-screen w-full pt-14 bg-transparent">
      <div className="flex flex-col items-center pt-[180]">
        <div className="text-center flex flex-col gap-2">
          <h1 className="heading1 font-bold">Ready to bring ideas to life?</h1>
          <h3 className="body1 font-semibold text-richblue-300/50">
            Build apps and websites effortlessly with just a conversation
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
