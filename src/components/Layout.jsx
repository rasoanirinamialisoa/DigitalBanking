import React from 'react';
import Header from './HeadPage'; // Importez votre en-tête ici
import Footer from './Footer'; // Importez votre pied de page ici


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
