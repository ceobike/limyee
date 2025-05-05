"use client";

import { ErrorBoundary } from "@/components/ui/error-boundary";
import { SafeBanner } from "@/components/sections/safe-banner";
import { SafeFloatingActionBar } from "@/components/layout/safe-floating-action-bar";
import Link from "next/link";

export function SimpleHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl">MyEE</div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">Products</Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
          </nav>
          <Link
            href="/contact"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Contact Us
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <ErrorBoundary sectionName="Banner">
          <SafeBanner />
        </ErrorBoundary>

        <section className="py-12 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <ErrorBoundary key={i} sectionName={`Product Card ${i}`}>
                  <div className="rounded-lg border bg-card shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-2">Product {i}</h3>
                    <p className="text-muted-foreground mb-4">
                      This is a sample product description. Each product card is wrapped in its own error boundary.
                    </p>
                    <Link
                      href={`/products/${i}`}
                      className="inline-flex items-center text-primary font-medium hover:underline"
                    >
                      Learn More →
                    </Link>
                  </div>
                </ErrorBoundary>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ErrorBoundary sectionName="About Content">
                <div>
                  <p className="text-lg mb-4">
                    MyEE is a leading provider of enterprise solutions with over 15 years of experience helping businesses transform and grow.
                  </p>
                  <p className="mb-4">
                    Our team of experts is dedicated to delivering innovative solutions that drive results. We work closely with our clients to understand their unique challenges and develop customized solutions that meet their specific needs.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </ErrorBoundary>

              <ErrorBoundary sectionName="Stats">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "15+", label: "Years of Experience" },
                    { value: "500+", label: "Clients Worldwide" },
                    { value: "98%", label: "Client Satisfaction" },
                    { value: "24/7", label: "Support Available" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-card rounded-lg border p-4 text-center">
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ErrorBoundary>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted/30 border-t py-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {["Products", "Solutions", "Company", "Resources"].map((title, i) => (
              <div key={i}>
                <h3 className="font-medium mb-4">{title}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <li key={j}>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        {title} Link {j}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © 2024 MyEE. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <ErrorBoundary sectionName="Floating Action Bar">
        <SafeFloatingActionBar />
      </ErrorBoundary>
    </div>
  );
}
