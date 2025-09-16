import React, { ReactNode } from "react";
import type { Metadata } from "next";
import ProductListContainer from "@/shared/containers/ProductList.container";

export const metadata: Metadata = {
  title: "Lorem&ipsum 2",
  description: "lorem ipsum dolor sit amet",
};

export default function MainLayout({ children }: Readonly<{children: ReactNode }>) {
  
  return (
    <ProductListContainer>
      {children}
    </ProductListContainer>
  );
}
