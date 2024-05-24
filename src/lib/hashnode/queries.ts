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
      readTimeInMinutes
      content {
        markdown
      }
      tags {
        name
        postsCount
      }
      features{
        tableOfContents{
          isEnabled
          items{
            id
            level
            slug
            title
            parentId
          }
        }
      }
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
    seriesList(first:20){
      edges{
        node{
          name
          posts(first:20){
            totalDocuments
          }
        }
      }
    }
    posts(first:20){
      edges{
        node{
          title
          publishedAt
          slug
          brief
          coverImage{
            url
          }
          content {
            markdown
          }   
          series{
            name
          }                 
        }
      }
    }
  }
}
`;
export const GetPostsBySeries = `query GetPostsBySeries($host: String!){
  publication(host: $host){
    seriesList(first:20){
      edges{
        node{
          name
          posts(first:20){
            totalDocuments
          }
        }
      }
    }
  }
}`;

export const subscribe = `
mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
  subscribeToNewsletter(input: $input) {
    status
  }
}`;
