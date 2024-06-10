'use client';
import React from 'react';
import NavBar from './NavBar';

const Header = () => (
  <header className="bg-gray-800 inline-flex">
    <img 
    className='w-20 ml-8' 
    src="https://i.ibb.co/QpJfTTR/logo-removebg-preview.png"></img>
    <NavBar />
  </header>
);

export default Header;
