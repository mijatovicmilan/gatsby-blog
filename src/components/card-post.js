import React from "react";
import { Link } from "gatsby";
import blogCategories from "../../utils/blog-categories";

const CardPost = ({ posts }) => {
  return (
    <>
      {posts.map(post => {
        const category = blogCategories.find(
          category => category.slug === post.frontmatter.category
        );

        return (
          <div key={post.frontmatter.title}>
            {category && (
              <div>
                <Link to={`/blog/${category.slug}`} className="inline-block">
                  <span
                    className={`${category.color} inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium`}
                  >
                    {category.name}
                  </span>
                </Link>
              </div>
            )}
            <Link to={`/blog/${post.frontmatter.slug}`} className="block mt-4">
              <p className="text-xl font-semibold text-gray-900">
                {post.frontmatter.title}
              </p>
              <p
                className="mt-3 text-base text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description,
                }}
                itemProp="description"
              />
            </Link>
            <div className="mt-2 flex items-center">
              <div className="text-sm text-gray-500">
                <time dateTime={post.frontmatter.date}>
                  {post.frontmatter.date}
                </time>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CardPost;
