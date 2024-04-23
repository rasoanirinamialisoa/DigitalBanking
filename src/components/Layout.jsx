import React from 'react';
import Header from './HeadPage';
import Footer from './Footer';
const Layout = ({ children }) => {
  return (
    <>
      <Header  />
      <main>{children}</main> 
      <Footer />
    </>
  );
};

export default Layout;
