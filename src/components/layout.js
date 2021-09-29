import * as React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Cta from "../components/cta";

const Layout = ({ location, title, children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Cta />
      <Footer />
    </>
  );
};

export default Layout;
