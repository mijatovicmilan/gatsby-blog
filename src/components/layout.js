import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
