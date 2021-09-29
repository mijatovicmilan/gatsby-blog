import { graphql, useStaticQuery } from "gatsby";

const useRecentPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(limit: 3, sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          id
          frontmatter {
            title
            slug
          }
        }
      }
    }
  `);
  return data.allMdx.nodes;
};

export default useRecentPosts;
