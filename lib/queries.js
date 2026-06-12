// Single GraphQL query that pulls every section's content in one round-trip.
// Field + group names match the ACF setup on cms.qarigroup.com.
export const PORTFOLIO_QUERY = /* GraphQL */ `
  query PortfolioData {
    projects(first: 50, where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        projectFields {
          role
          description
        }
      }
    }

    experiences(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        experienceFields {
          company
          location
          startdate
          enddate
          responsibilities
        }
      }
    }

    certifications(first: 50, where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        certificationFields {
          issuer
        }
      }
    }

    achievements(first: 50, where: { orderby: { field: DATE, order: ASC } }) {
      nodes {
        id
        title
        achievementFields {
          statnumber
          statlabel
        }
      }
    }

    posts(first: 6, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }

    page(id: "site-content", idType: URI) {
      title
      heroContent {
        name
        headline
        intro
        profileImage {
          node {
            sourceUrl
            altText
          }
        }
        cvFile {
          node {
            mediaItemUrl
          }
        }
      }
      about {
        bio
        coreSkills
      }
      contact {
        email
        phone
        locationText
        linkedinProfile
        otherSocial
      }
    }
  }
`;

// Single blog post by slug, for /blog/[slug] pages.
export const POST_QUERY = /* GraphQL */ `
  query SinglePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// Lightweight list of slugs for generateStaticParams().
export const POST_SLUGS_QUERY = /* GraphQL */ `
  query PostSlugs {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;
