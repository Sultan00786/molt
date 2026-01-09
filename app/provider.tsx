"use client";

import { store } from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";

function RootProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ClerkProvider>
        <HeroUIProvider>{children}</HeroUIProvider>
      </ClerkProvider>
    </Provider>
  );
}

export default RootProvider;
