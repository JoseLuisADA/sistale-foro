'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-6 mt-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">Foro de Sistale</h2>
            <p className="mt-2">La versión que todos esperaban</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/about-us" className="hover:underline">Sobre Nosotros</Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Sistale Foro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
);

export default Footer;
