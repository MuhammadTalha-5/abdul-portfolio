// Safe placeholder content used when the CMS is empty or unreachable, so the
// site always renders. Real content from WordPress always takes precedence.
export const fallbackData = {
  hero: {
    name: "Abdul",
    headline: "HSE Officer & Safety Professional",
    intro:
      "I lead safety operations, training, and risk-management programs to keep teams and worksites incident-free.",
    availability: "Available for opportunities",
    profileImage: null,
    cvUrl: null,
  },
  about: {
    bio: "<p>About content coming soon.</p>",
    skills: [
      "Risk Assessment",
      "Permit-to-Work (PTW)",
      "Incident Investigation",
      "Emergency Response",
      "Behavioral Safety",
    ],
    languages: [
      { name: "English", rating: 5 },
      { name: "Urdu", rating: 5 },
      { name: "Arabic", rating: 3 },
    ],
  },
  experience: [
    {
      id: "fb-exp-1",
      title: "HSE Officer",
      company: "Your Company",
      consultant: "",
      client: "",
      contractor: "",
      location: "City, Country",
      start: "2023",
      end: "Present",
      responsibilities: ["Experience details coming soon."],
    },
  ],
  achievements: [
    { id: "fb-a-1", number: "22%", label: "Unsafe Observations Reduced" },
    { id: "fb-a-2", number: "180+", label: "Workers Trained" },
    { id: "fb-a-3", number: "120", label: "Incident-Free Days" },
    { id: "fb-a-4", number: "8+", label: "Certifications" },
  ],
  certifications: [
    { id: "fb-c-1", title: "NEBOSH IGC", issuer: "NEBOSH", image: null },
    { id: "fb-c-2", title: "OSHA 30-Hour", issuer: "OSHA", image: null },
    { id: "fb-c-3", title: "ISO 45001 Auditing", issuer: "Internal Auditing", image: null },
  ],
  projects: [
    {
      id: "fb-p-1",
      title: "Sample Project",
      role: "HSE Officer",
      description:
        "Project details coming soon.",
      image: null,
    },
  ],
  posts: [],
  contact: {
    email: "you@example.com",
    phone: "",
    location: "",
    linkedin: "",
    otherSocial: "",
  },
};
