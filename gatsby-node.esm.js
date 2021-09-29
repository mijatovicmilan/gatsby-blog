const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
import blogCategories from "./utils/blog-categories";
import { paginate } from "gatsby-awesome-pagination";

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            frontmatter {
              slug
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const posts = result.data.allMdx.nodes;

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: `/blog/${post.frontmatter.slug}`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      });
    });

    paginate({
      createPage,
      items: posts,
      itemsPerPage: 4,
      pathPrefix: "/blog",
      component: path.resolve(`./src/templates/blog.js`),
    });
  }

  const blogCategory = path.resolve(`./src/templates/blog-category.js`);

  const catResult = await graphql(
    `
      {
        allMdx {
          group(field: frontmatter___category) {
            nodes {
              id
              frontmatter {
                title
                category
              }
            }
          }
        }
      }
    `
  );
  const categoryPosts = catResult.data.allMdx.group;

  categoryPosts.forEach((category, index) => {
    const catSlug = category.nodes[0].frontmatter.category;

    paginate({
      createPage,
      items: category.nodes,
      itemsPerPage: 4,
      pathPrefix: `/blog/${catSlug}`,
      component: blogCategory,
      context: {
        slug: catSlug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
  `);
};
