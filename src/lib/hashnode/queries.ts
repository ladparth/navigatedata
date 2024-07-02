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
        bio{
          markdown
        }
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
      series {
        name
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
query GetPostsByPublication($host: String!,$first: Int!,$after: String){
  publication(host: $host){
    id
    title
    descriptionSEO
    url
    canonicalURL
    author{
      name
      profilePicture
    }
    isTeam
    ogMetaData{
      image
    }
    favicon
    seriesList(first:$first, after: $after){
      edges{
        node{
          id
          name
          posts(first: $first, after: $after){
            totalDocuments
          }
        }
      }
    }
    posts(first: $first, after: $after){
      pageInfo{
        hasNextPage
        endCursor
      }
      edges{
        node{
          id
          title
          publishedAt
          updatedAt
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

export const getPageBySlug = `
query getPages($host: String!, $slug: String!) {
  publication(host: $host) {
    id
    staticPage(slug: $slug) {
      id
      title
      slug
      ogMetaData {
        image
      }
      seo {
        title
        description
      }
      content {
        markdown
      }  
    }
  }
}`;

export const getDraftById = `
query DraftById($id: ObjectId!) {
  draft(id: $id) {
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
    canonicalUrl
    author {
      name
      profilePicture
      username
      bio {
        markdown
      }
    }
    coverImage {
      url
    }
    slug
    readTimeInMinutes
    content {
      markdown
    }
    tagsV2{
      __typename
    }
    features {
      tableOfContents {
        isEnabled
        items {
          id
          level
          slug
          title
          parentId
        }
      }
    }
  }
}`;
