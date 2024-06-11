'use client';
import React from 'react';
import NavBar from './NavBar';

const Header = () => (
  <header className="bg-gray-800">
    <img 
    className='ml-8 absolute w-16 top-1 left-5' 
    src="https://i.ibb.co/QpJfTTR/logo-removebg-preview.png"></img>
    <NavBar />
  </header>
);

export default Header;
