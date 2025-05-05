"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SolutionSectionData } from "@/lib/types";

interface SolutionsProps {
  data: SolutionSectionData;
}

export function Solutions({ data }: SolutionsProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h2>
          {data.description && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.solutions.map((solution) => (
            <div
              key={solution.id}
              className="bg-card rounded-lg border shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-all"
            >
              <div className="aspect-[16/9] relative">
                <Image
                  src={solution.image.src}
                  alt={solution.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-muted-foreground mb-4">{solution.description}</p>
                
                {solution.tags && solution.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-auto pt-4">
                  <Link
                    href={solution.link.href}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {solution.link.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
