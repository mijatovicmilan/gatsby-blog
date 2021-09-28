import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = ({ location, title, children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
