import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

function Provider({ children }: { children: ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}

export default Provider;
