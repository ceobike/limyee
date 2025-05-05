"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { HeaderData, NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface HeaderProps {
  data: HeaderData;
}

export function Header({ data }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const renderNavItem = (item: NavItem, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;

    if (!hasChildren) {
      return (
        <Link
          href={item.href}
          className={cn(
            "text-foreground hover:text-primary transition-colors",
            isMobile ? "block py-2" : "px-3 py-2"
          )}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <div className="relative group">
        <button
          className={cn(
            "flex items-center gap-1 text-foreground hover:text-primary transition-colors",
            isMobile ? "py-2 w-full text-left" : "px-3 py-2"
          )}
          onClick={() => isMobile && toggleDropdown(item.label)}
          aria-expanded={isMobile ? activeDropdown === item.label : undefined}
        >
          {item.label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "transition-transform duration-200",
              isMobile && activeDropdown === item.label ? "rotate-180" : ""
            )}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <div
          className={cn(
            isMobile
              ? "mt-1 ml-4 space-y-1"
              : "absolute left-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
            isMobile && activeDropdown === item.label ? "block" : isMobile ? "hidden" : ""
          )}
        >
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "block transition-colors",
                isMobile ? "py-2 hover:text-primary" : "px-4 py-2 hover:bg-muted"
              )}
              onClick={() => isMobile && setMobileMenuOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            {data.logo.src.startsWith("/") ? (
              <div className="h-10 w-28 bg-muted flex items-center justify-center rounded">
                <span className="text-sm font-medium">Logo</span>
              </div>
            ) : (
              <Image
                src={data.logo.src}
                alt={data.logo.alt}
                width={data.logo.width || 120}
                height={data.logo.height || 40}
                className="h-auto"
                priority
              />
            )}
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {data.navigation.map((item) => (
              <div key={item.href}>{renderNavItem(item)}</div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {data.ctaButton && (
            <Link
              href={data.ctaButton.href}
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {data.ctaButton.label}
            </Link>
          )}

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-muted"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-background pt-16 transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="container py-4 space-y-1">
          {data.navigation.map((item) => (
            <div key={item.href}>{renderNavItem(item, true)}</div>
          ))}

          {data.ctaButton && (
            <div className="pt-4">
              <Link
                href={data.ctaButton.href}
                className="block w-full text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow"
                onClick={() => setMobileMenuOpen(false)}
              >
                {data.ctaButton.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
