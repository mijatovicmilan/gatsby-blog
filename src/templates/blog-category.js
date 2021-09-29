import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";
import CardPost from "../components/card-post";
import blogCategories from "../../utils/blog-categories";
import Pagination from "../components/pagination";

const BlogPostsCategoryTemplate = ({
  pageContext: { slug },
  data,
  location,
  pageContext,
}) => {
  const posts = data.allMdx.nodes;
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const category = blogCategories.find(category => category.slug === slug);

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <div className="bg-white pt-4 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
          <h1 className="order-1 text-gray-900 text-3xl font-extrabold tracking-tight mt-2">
            {category?.name}
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

export default BlogPostsCategoryTemplate;

export const pageQuery = graphql`
  query ($slug: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { category: { eq: $slug } } }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        id
        excerpt(pruneLength: 160)
        body
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
          slug
          category
        }
      }
    }
  }
`;
