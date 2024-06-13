'use client'
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const AboutUsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto mt-10 bg-white p-5 rounded shadow">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>
        
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">¿Quiénes Somos?</h2>
          <p>
            Somos un grupo de apasionados jugadores de Nostale que, con mucho esfuerzo y dedicación, crearemos un servidor privado para ofrecer una experiencia de juego única y mejorada. Nuestro objetivo es mantener viva la comunidad de Nostale proporcionando un entorno donde los jugadores puedan disfrutar del juego con nuevas características y eventos personalizados.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Historia del Servidor</h2>
          <p>
            Nuestro servidor será fundado con la visión de crear un lugar donde los jugadores de Nostale puedan reunirse y disfrutar del juego sin las limitaciones de los servidores oficiales y otras versiones privadas. Se buscará el crecimiento y evolución, añadiendo contenido exclusivo y mejorando constantemente la experiencia de juego basada en los comentarios de nuestra comunidad.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Características Especiales</h2>
          <ul className="list-disc list-inside">
            <li>Eventos personalizados y únicos</li>
            <li>Actualizaciones regulares con nuevo contenido</li>
            <li>Soporte dedicado y atención a la comunidad</li>
            <li>Sistema de economía y comercio balanceado</li>
            <li>Entorno seguro y justo para todos los jugadores</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Cómo Involucrarse</h2>
          <p>
            Nos encanta ver a nuestra comunidad involucrarse y contribuir al crecimiento del servidor. Puedes unirte a nuestro foro, participar en eventos y dar tus opiniones y sugerencias para ayudarnos a mejorar. También estamos abiertos a recibir donaciones para mantener el servidor y seguir ofreciendo nuevas características.
          </p>
          <p>
            Para más información, puedes visitar nuestra página de <a href="/team" className="text-blue-500 hover:underline">equipo</a> y conocer a las personas detrás de este proyecto.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Contacto</h2>
          <p>
            Si tienes alguna pregunta, sugerencia o simplemente quieres saludar, no dudes en contactarnos a través de nuestro correo electrónico: <a href="mailto:joseluis.luzuriagaalanis.web@adaits.es" className="text-blue-500 hover:underline">joseluis.luzuriagaalanis.web@adaits.es</a> o unirte a nuestro servidor de Discord para una respuesta más rápida y directa.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutUsPage;
