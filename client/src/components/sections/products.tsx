"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductSectionData } from "@/lib/types";

interface ProductsProps {
  data: ProductSectionData;
}

export function Products({ data }: ProductsProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h2>
          {data.description && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.products.map((product) => (
            <div
              key={product.id}
              className="group rounded-lg border bg-card shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">{product.description}</p>
                <Link
                  href={product.link.href}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  {product.link.label}
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
