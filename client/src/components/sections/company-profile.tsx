"use client";

import Image from "next/image";
import Link from "next/link";
import { CompanyProfileData } from "@/lib/types";
import { Calendar, Users, ThumbsUp, Headphones } from "lucide-react";

interface CompanyProfileProps {
  data: CompanyProfileData;
}

export function CompanyProfile({ data }: CompanyProfileProps) {
  // Map icon names to components
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "calendar":
        return <Calendar className="h-6 w-6" />;
      case "users":
        return <Users className="h-6 w-6" />;
      case "thumbs-up":
        return <ThumbsUp className="h-6 w-6" />;
      case "headphones":
        return <Headphones className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h2>
            <p className="text-lg text-muted-foreground mb-6">{data.description}</p>
            
            {data.ctaLink && (
              <Link
                href={data.ctaLink.href}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {data.ctaLink.label}
              </Link>
            )}
          </div>
          
          {data.image && (
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-card rounded-lg border p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {getIcon(stat.icon)}
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
