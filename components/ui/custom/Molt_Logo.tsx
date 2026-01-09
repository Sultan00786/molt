import Image from "next/image";
import logo_shap from "../../../public/assets/logo_shap.svg";

function Molt_Logo({ size = "medium" }: { size?: "medium" | "large" }) {
  const width = size === "medium" ? 32 : 40;
  return (
    <div className="flex items-center gap-2 py-2">
      <Image src={logo_shap} width={width} height={width} alt="logo_shap" />
      <h1
        className={`${
          size === "medium" ? "text-[24px]" : "text-[32px]"
        } font-extrabold text-white font-inter italic tracking-[2px]`}
      >
        Molt
      </h1>
    </div>
  );
}

export default Molt_Logo;
