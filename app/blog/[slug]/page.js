import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPostSlugs } from "@/lib/wp";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Link
        href="/#blog"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Back to portfolio
      </Link>

      <header className="mt-8">
        {date && (
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            {date}
          </span>
        )}
        <h1 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          {post.title}
        </h1>
      </header>

      {post.image && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-accent-soft">
          <Image
            src={post.image.url}
            alt={post.image.alt || post.title}
            fill
            sizes="(max-width: 768px) 90vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose-wp mt-10 text-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
