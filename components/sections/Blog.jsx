"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeading from "../SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";

function formatDate(d) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function Blog({ posts }) {
  return (
    <section id="blog" className="section bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="Writing"
          title="From the blog"
          intro="Notes and best practices on safety, training, and culture."
        />

        {posts.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-line bg-bg p-10 text-center text-muted">
              New articles are on the way. Check back soon.
            </div>
          </Reveal>
        ) : (
          <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.08}>
            {posts.map((post) => (
              <RevealItem key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/5"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-accent-soft">
                    {post.image ? (
                      <Image
                        src={post.image.url}
                        alt={post.image.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 30vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-serif text-4xl text-accent/30">
                        ✎
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                      {formatDate(post.date)}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    <div
                      className="prose-wp mt-2 line-clamp-3 text-sm"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Read article
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  );
}
