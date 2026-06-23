import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { POSTS, getPost, formatPostDate } from "@/lib/blog";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { site } from "@/lib/config";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} · ${site.name}`,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/opengraph-image"),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e2f3ee 0%,#f1f8f5 70%,#f1f8f5 100%)" }}
        >
          <Container className="max-w-[760px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <Link href="/blog" className="hover:text-ink">Blog</Link>
            </nav>
            <h1 className="mt-4 text-[clamp(30px,4vw,46px)] font-extrabold leading-[1.06] tracking-[-1.4px] text-ink">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted">
              <span>{formatPostDate(post.date)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} /> {post.readMins} min read
              </span>
            </div>
          </Container>
        </div>

        <Container className="max-w-[760px] py-12">
          <article>
            {post.blocks.map((b, i) => {
              if (b.type === "h2")
                return (
                  <h2 key={i} className="mt-9 mb-3 font-display text-2xl font-extrabold text-ink">
                    {b.text}
                  </h2>
                );
              if (b.type === "ul")
                return (
                  <ul key={i} className="mb-5 list-disc space-y-1.5 pl-5">
                    {b.items.map((it) => (
                      <li key={it} className="text-[16.5px] leading-relaxed text-ink-soft">{it}</li>
                    ))}
                  </ul>
                );
              return (
                <p key={i} className="mb-5 text-[16.5px] leading-relaxed text-ink-soft">
                  {b.text}
                </p>
              );
            })}
          </article>

          {more.length > 0 && (
            <div className="mt-14 border-t border-line pt-10">
              <h2 className="font-display text-xl font-extrabold text-ink">Keep reading</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {more.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="card-warm rounded-[18px] p-5 transition hover:border-accent/50">
                    <h3 className="text-[16px] font-bold leading-snug text-ink">{p.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14">
            <CtaStrip />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
