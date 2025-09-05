import GradiantTextarea from "./GradiantTextarea";

function HeroSection() {
  return (
    <div className="h-full w-full pt-[200px] bg-transparent">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-heading1 font-lora font-bold">
            Ready to bring ideas to life?
          </h1>
          <h3 className="text-body1 font-semibold text-richblue-300/50">
            Build apps and websites effortlessly with just a conversation
          </h3>
        </div>
        <div className="w-[540px]">
          <GradiantTextarea classNames="w-full" />
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
