// app/layout.jsx
'use client';

import './globals.css';
import React from 'react';
import localFont from "next/font/local"
import PropTypes from 'prop-types';
import { UserProvider } from '../context/UserContext';


const myFont = localFont({
  src: "../../public/fonts/CrushBubble.otf",
  display: "swap",
})

export default function RootLayout({ children }) {

 

  return (
    <html lang="en">
      
      <body className={`${myFont.className} h-full`}>
        <UserProvider>
            {children}
        </UserProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired
}