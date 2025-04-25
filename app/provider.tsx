"use client";

import { store } from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";

function RootProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <HeroUIProvider>{children}</HeroUIProvider>
    </Provider>
  );
}

export default RootProvider;
