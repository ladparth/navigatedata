export const getPostBySlug = `
query GetPostBySlug($host: String!, $slug: String!) {
  publication(host: $host) {
    post(slug: $slug) {
      id
      title
      subtitle
      seo {
        title
        description
      }
      publication {
        id
      }
      url
      canonicalUrl
      author {
        name
        profilePicture
        username
      }
      coverImage {
        url
      }
      publishedAt
      slug
      brief
      comments(first: 0) {
        totalDocuments
      }
      views
      readTimeInMinutes
      content {
        markdown
        html
      }
      tags {
        name
        postsCount
      }
      reactionCount
    }
  }
}
`;
export const getPostMetadataBySlug = `
query GetPostBySlug($host: String!, $slug: String!) {
  publication(host: $host) {
    post(slug: $slug) {
      title
      seo {
        title
        description
      }
      url
      canonicalUrl
      url
      coverImage {
        url
      }
      slug
      brief
    }
  }
}
`;

export const getPostsByPublication = `
query GetPostsByPublication($host: String!) {
  publication(host: $host){
    posts(first:20){
      edges{
        node{
          title
          author{
            name
            profilePicture
          }
          tags{
            name
          }
          publishedAt
          slug
          brief
          coverImage{
            url
          }                    
        }
      }
    }
  }
}
`;
