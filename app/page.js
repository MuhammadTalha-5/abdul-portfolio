import { getPortfolio } from "@/lib/wp";
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
  return {
    title: `${hero.name} — ${hero.headline}`,
    description: hero.intro,
  };
}

export default async function Home() {
  const data = await getPortfolio();

  return (
    <>
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
