import { getPortfolio } from "@/lib/wp";
import { site } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Achievements from "@/components/sections/Achievements";
import Certifications from "@/components/sections/Certifications";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

// ISR: regenerate the page at most once per minute (plus on-demand via webhook).
export const revalidate = 60;

export async function generateMetadata() {
  const { hero } = await getPortfolio();
  const title = `${hero.name} — ${hero.headline}`;
  return {
    title,
    description: hero.intro,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description: hero.intro,
      url: site.url,
      type: "profile",
    },
    twitter: {
      title,
      description: hero.intro,
    },
  };
}

export default async function Home() {
  const data = await getPortfolio();

  // Person structured data helps search engines understand who this is.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.hero.name,
    jobTitle: data.hero.headline,
    description: data.hero.intro,
    url: site.url,
    image: data.hero.profileImage?.url,
    email: data.contact.email ? `mailto:${data.contact.email}` : undefined,
    telephone: data.contact.phone || undefined,
    address: data.contact.location
      ? { "@type": "PostalAddress", addressLocality: data.contact.location }
      : undefined,
    sameAs: [data.contact.linkedin, data.contact.otherSocial].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav name={data.hero.name} />
      <main>
        <Hero hero={data.hero} />
        <About about={data.about} />
        <Experience experience={data.experience} />
        <Achievements achievements={data.achievements} />
        <Certifications certifications={data.certifications} />
        <Projects projects={data.projects} />
        <Blog posts={data.posts} />
        <Contact contact={data.contact} name={data.hero.name} />
      </main>
      <Footer name={data.hero.name} email={data.contact.email} />
    </>
  );
}
