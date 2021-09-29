/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const social = data.site.siteMetadata?.social;

  return (
    <>
      {author?.name && (
        <div className="relative text-lg max-w-prose mx-auto border-t py-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <StaticImage
                className="rounded-full shadow-sm"
                layout="fixed"
                formats={["auto", "webp", "avif"]}
                src="../images/profile-pic.png"
                width={64}
                height={64}
                quality={95}
                alt="Profile picture"
              />
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-bold">{author.name}</h4>
              <p className="mt-1 text-gray-500 text-base">
                {author?.summary || null}{" "}
                <a
                  className="text-indigo-600 hover:text-indigo-500"
                  href={`https://twitter.com/${social?.twitter || ``}`}
                >
                  You should follow them on Twitter
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bio;
