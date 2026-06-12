// Global, code-side site configuration (things that rarely change).
export const site = {
  name: "Abdul",
  // Used for <title>, OpenGraph, etc. Overridden by Hero/About data where relevant.
  defaultTitle: "Abdul — Portfolio",
  defaultDescription:
    "Portfolio showcasing experience, achievements, certifications, projects and writing.",
  // Production URL of the Next.js site (used for metadata/canonical).
  url: "https://abdul.qarigroup.com",
};

// In-page anchor navigation. `id` must match each <section id="...">.
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];
