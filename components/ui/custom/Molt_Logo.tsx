import Image from "next/image";
import logo_shap from "../../../public/assets/logo_shap.svg";

function Molt_Logo() {
  return (
    <div className="flex items-center gap-2 py-2">
      <Image src={logo_shap} width={32} height={32} alt="logo_shap" />
      <h1 className="text-[24px] font-extrabold text-white font-inter italic tracking-[2px]">
        Molt
      </h1>
    </div>
  );
}

export default Molt_Logo;
