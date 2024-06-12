'use client'
import React from 'react';
import TeamSection from '../../components/TeamSection';
import MainLayout from '../../components/layout/MainLayout';
import { teamMembers } from '../../components/constants/teamMembers';


const TeamPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto mt-10 bg-white p-5 rounded shadow">
        <h1 className="text-4xl font-bold mb-8 text-center">EQUIPO DE SISTALE</h1>
        {Object.keys(teamMembers).map(username => (
          <TeamSection key={username} username={username} roles={teamMembers[username].roles} />
        ))}
      </div>
    </MainLayout>
  );
};

export default TeamPage;
