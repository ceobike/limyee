"use client";

import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { mockHeaderData, mockFooterData } from "@/lib/mock-data";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary sectionName="Header">
        <Header data={mockHeaderData} />
      </ErrorBoundary>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <ErrorBoundary sectionName="Footer">
        <Footer data={mockFooterData} />
      </ErrorBoundary>
    </div>
  );
}
