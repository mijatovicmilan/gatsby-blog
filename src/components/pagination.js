import * as React from "react";
import { Link } from "gatsby";

const Pagination = ({
  data: { previousPagePath, nextPagePath, humanPageNumber, numberOfPages },
}) => {
  if (!previousPagePath && !nextPagePath) {
    return <></>;
  }

  return (
    <nav
      className="bg-white mt-12 mx-auto px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 max-w-lg lg:max-w-7xl"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{humanPageNumber}</span> of{" "}
          <span className="font-medium">{numberOfPages}</span> pages
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        {previousPagePath && (
          <Link
            to={previousPagePath}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </Link>
        )}
        {nextPagePath && (
          <Link
            to={nextPagePath}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </Link>
        )}
      </div>
    </nav>

    /* <>
      {previousPagePath && <Link to={previousPagePath}>Previous</Link>}
      {nextPagePath && <Link to={nextPagePath}>Next</Link>}
    </> */
  );
};

export default Pagination;
