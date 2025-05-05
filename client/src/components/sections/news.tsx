"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsSectionData } from "@/lib/types";

interface NewsProps {
  data: NewsSectionData;
}

export function News({ data }: NewsProps) {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h2>
            {data.description && (
              <p className="text-lg text-muted-foreground max-w-2xl">
                {data.description}
              </p>
            )}
          </div>
          
          {data.viewAllLink && (
            <Link
              href={data.viewAllLink.href}
              className="inline-flex items-center text-primary font-medium hover:underline mt-4 md:mt-0"
            >
              {data.viewAllLink.label}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.news.map((item) => (
            <div
              key={item.id}
              className="group rounded-lg border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
            >
              {item.image && (
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  {item.category && (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {item.category}
                    </span>
                  )}
                  <time className="text-sm text-muted-foreground" dateTime={item.date}>
                    {formatDate(item.date)}
                  </time>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">{item.excerpt}</p>
                <Link
                  href={item.link.href}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  {item.link.label}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
