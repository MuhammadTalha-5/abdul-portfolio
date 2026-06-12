import { PORTFOLIO_QUERY, POST_QUERY, POST_SLUGS_QUERY } from "./queries";
import { fallbackData } from "./fallback";

const API_URL = process.env.WORDPRESS_API_URL || "https://cms.qarigroup.com/graphql";

// How often (seconds) ISR refreshes content. On-demand webhook can refresh sooner.
const REVALIDATE = 60;

// --- low-level GraphQL fetch -------------------------------------------------
async function gql(query, variables = {}) {
  // Abort a slow/unreachable CMS so SSR/build falls back quickly instead of hanging.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  let res;
  try {
    res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      // ISR: cache the response, refresh every REVALIDATE seconds, and allow
      // on-demand invalidation via the "wp" tag (see /api/revalidate).
      next: { revalidate: REVALIDATE, tags: ["wp"] },
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) throw new Error(`WPGraphQL HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`WPGraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  return json.data;
}

// --- normalization helpers ---------------------------------------------------
const img = (node) =>
  node?.node?.sourceUrl
    ? { url: node.node.sourceUrl, alt: node.node.altText || "" }
    : null;

const lines = (text) =>
  (text || "")
    .split(/\r?\n/)
    .map((l) => l.replace(/^[-•\s]+/, "").trim())
    .filter(Boolean);

// Use a WP value if it's meaningfully present, else fall back.
const pick = (value, fb) =>
  value !== null && value !== undefined && value !== "" ? value : fb;

// Use a WP array if it has items, else fall back (keeps the page from looking empty).
const pickArr = (arr, fb) => (Array.isArray(arr) && arr.length ? arr : fb);

// --- shape the raw GraphQL payload into what components consume --------------
function normalize(data) {
  const fb = fallbackData;
  const hero = data?.page?.heroContent || {};
  const about = data?.page?.about || {};
  const contact = data?.page?.contact || {};

  const projects = (data?.projects?.nodes || []).map((n) => ({
    id: n.id,
    title: n.title,
    role: n.projectFields?.role || "",
    description: n.projectFields?.description || "",
    image: img(n.featuredImage),
  }));

  const experience = (data?.experiences?.nodes || []).map((n) => ({
    id: n.id,
    title: n.title,
    company: n.experienceFields?.company || "",
    location: n.experienceFields?.location || "",
    start: n.experienceFields?.startdate || "",
    end: n.experienceFields?.enddate || "",
    responsibilities: lines(n.experienceFields?.responsibilities),
  }));

  const certifications = (data?.certifications?.nodes || []).map((n) => ({
    id: n.id,
    title: n.title,
    issuer: n.certificationFields?.issuer || "",
    image: img(n.featuredImage),
  }));

  const achievements = (data?.achievements?.nodes || []).map((n) => ({
    id: n.id,
    number: n.achievementFields?.statnumber || "",
    label: n.achievementFields?.statlabel || "",
  }));

  const posts = (data?.posts?.nodes || []).map((n) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    excerpt: n.excerpt || "",
    date: n.date,
    image: img(n.featuredImage),
  }));

  return {
    hero: {
      name: pick(hero.name, fb.hero.name),
      headline: pick(hero.headline, fb.hero.headline),
      intro: pick(hero.intro, fb.hero.intro),
      profileImage: img(hero.profileImage) || fb.hero.profileImage,
      cvUrl: hero.cvFile?.node?.mediaItemUrl || fb.hero.cvUrl,
    },
    about: {
      bio: pick(about.bio, fb.about.bio),
      skills: pickArr(lines(about.coreSkills), fb.about.skills),
    },
    experience: pickArr(experience, fb.experience),
    achievements: pickArr(achievements, fb.achievements),
    certifications: pickArr(certifications, fb.certifications),
    projects: pickArr(projects, fb.projects),
    posts,
    contact: {
      email: pick(contact.email, fb.contact.email),
      phone: pick(contact.phone, fb.contact.phone),
      location: pick(contact.locationText, fb.contact.location),
      linkedin: pick(contact.linkedinProfile, fb.contact.linkedin),
      otherSocial: pick(contact.otherSocial, fb.contact.otherSocial),
    },
  };
}

// --- public API --------------------------------------------------------------
export async function getPortfolio() {
  try {
    const data = await gql(PORTFOLIO_QUERY);
    return normalize(data);
  } catch (err) {
    console.warn("[wp] Falling back to placeholder content:", err.message);
    return fallbackData;
  }
}

export async function getPostSlugs() {
  try {
    const data = await gql(POST_SLUGS_QUERY);
    return (data?.posts?.nodes || []).map((n) => n.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getPost(slug) {
  try {
    const data = await gql(POST_QUERY, { slug });
    if (!data?.post) return null;
    return {
      title: data.post.title,
      content: data.post.content || "",
      date: data.post.date,
      image: img(data.post.featuredImage),
    };
  } catch {
    return null;
  }
}
