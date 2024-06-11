'use client';
import React from 'react';
import NavBar from './NavBar';
import Link from 'next/link'

const Header = () => (
  <header className="bg-gray-800">
    <Link href="/">
    <img 
    className='ml-8 absolute w-16 top-1 left-5 z-10' 
    src="https://i.ibb.co/QpJfTTR/logo-removebg-preview.png"></img>
    </Link>
    <NavBar />
  </header>
);

export default Header;
