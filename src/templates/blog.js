import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import CardPost from "../components/card-post";
import Pagination from "../components/pagination";

const Index = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMdx.nodes;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <div className="bg-white pt-4 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
          <h1 className="order-1 text-gray-900 text-3xl font-extrabold tracking-tight mt-2">
            Blog
          </h1>
          {posts.length !== 0 && (
            <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
              <CardPost posts={posts} />
            </div>
          )}
        </div>
        <Pagination data={pageContext} />
      </div>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          slug
          category
        }
      }
    }
  }
`;
