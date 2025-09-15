"use client";
import React from 'react';
// import Header from '../components/frontend/Header';
// import Footer from '../components/frontend/Footer';


interface UserLayoutProps {
  children: React.ReactNode;
}
const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Header /> */}
      <main className="pt-20">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
};
export default UserLayout;
