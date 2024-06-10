'use client';
import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl">Sistale Foro</h2>
            <p className="mt-2">La versión que todos han estado esperando</p>
          </div>
          <div className="flex space-x-4">
            <Link href="" className="hover:underline">Sobre Nosotros</Link>
            <Link href="" className="hover:underline">Contacto</Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Sistale Foro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
);

export default Footer;
