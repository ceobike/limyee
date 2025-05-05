"use client";

import Link from "next/link";
import Image from "next/image";
import { FooterData } from "@/lib/types";
import { Twitter, Linkedin, Facebook, Youtube } from "lucide-react";

interface FooterProps {
  data: FooterData;
}

export function Footer({ data }: FooterProps) {
  // Map social platform names to icons
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "youtube":
        return <Youtube className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
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
                />
              )}
            </Link>
            
            {data.socialLinks && data.socialLinks.length > 0 && (
              <div className="flex space-x-4 mt-4">
                {data.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Follow us on ${social.platform}`}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {data.columns.map((column, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="font-medium text-foreground mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              {data.copyright}
            </p>
            
            {data.bottomLinks && data.bottomLinks.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {data.bottomLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
