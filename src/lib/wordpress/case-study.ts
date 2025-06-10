const WP_API_URL = 'https://blog.3zerodigital.com/graphql';

export interface CaseStudy {
  id: string;
  title: string;
  content: string;
  slug: string;
  outcome: string;
  services: string[];
  description: string;
  afterImage: string;
  beforeImage: string;
  featuredImage: string;
  screenshot: string;
}

interface CaseStudyFields {
  outcome: string;
  services: string;
  description: string;
  afterImage: {
    node: {
      sourceUrl: string;
    };
  };
  beforeImage: {
    node: {
      sourceUrl: string;
    };
  };
  screenshot: {
    node: {
      sourceUrl: string;
    };
  };
}

interface CaseStudyNode {
  id: string;
  title: string;
  content: string;
  slug: string;
  caseStudyFields: CaseStudyFields;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}

interface GraphQLCaseStudiesResponse {
  data: {
    caseStudies: {
      edges: {
        node: CaseStudyNode;
      }[];
    };
  };
  errors?: { message: string }[];
}

interface GraphQLCaseStudyBySlugResponse {
  data: {
    caseStudyBy: CaseStudyNode;
  };
  errors?: { message: string }[];
}

export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  const query = `
    query NewQuery {
      caseStudies {
        edges {
          node {
            id
            title
            content(format: RENDERED)
            slug
            caseStudyFields {
              outcome
              services
              description
              afterImage {
                node {
                  sourceUrl
                }
              }
              beforeImage {
                node {
                  sourceUrl
                }
              }
            }
            featuredImage {
              node {
                altText
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(WP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: {
        tags: ['case-study'],
      },
    });

    const json: GraphQLCaseStudiesResponse = await response.json();

    // Check for GraphQL errors
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      return [];
    }

    // Map the data and return case studies
    const caseStudies = json.data.caseStudies.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      content: node.content,
      slug: node.slug,
      outcome: node.caseStudyFields?.outcome || '',
      services: node.caseStudyFields?.services.split(',') || [],
      description: node.caseStudyFields?.description || '',
      afterImage: node.caseStudyFields?.afterImage?.node.sourceUrl || '',
      beforeImage: node.caseStudyFields?.beforeImage?.node.sourceUrl || '',
      screenshot: node.caseStudyFields?.screenshot?.node.sourceUrl || '',
      featuredImage: node.featuredImage.node.sourceUrl || '',
    }));

    return caseStudies;
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export async function fetchCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  const query = `
    query CaseStudyBySlug($slug: String!) {
      caseStudyBy(slug: $slug) {
        id
        title
        content(format: RENDERED)
        slug
        caseStudyFields {
          outcome
          services
          description
          afterImage {
            node {
              sourceUrl
            }
          }
          beforeImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(WP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { slug },
      }),
      next: {
        tags: ['case-study'],
      },
    });

    const json: GraphQLCaseStudyBySlugResponse = await response.json();

    // Check for GraphQL errors
    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      return null;
    }

    const node = json.data.caseStudyBy;

    // Return the case study with formatted fields
    return {
      id: node.id,
      title: node.title,
      content: node.content,
      slug: node.slug,
      outcome: node.caseStudyFields?.outcome || '',
      services: node.caseStudyFields?.services.split(',') || [],
      description: node.caseStudyFields?.description || '',
      afterImage: node.caseStudyFields?.afterImage?.node.sourceUrl || '',
      beforeImage: node.caseStudyFields?.beforeImage?.node.sourceUrl || '',
      screenshot: node.caseStudyFields?.screenshot?.node.sourceUrl || '',
      featuredImage: node.featuredImage.node.sourceUrl || '',
    };
  } catch (error) {
    console.error('Fetch Error:', error);
    return null;
  }
}
