//src/components/TeamSection.tsx
'use client'
import React from 'react';
import PropTypes from 'prop-types';

const TeamSection = ({ username, roles }) => (
  <div className="p-5 hover:bg-yellow-100 rounded shadow-md mt-6">
    <h2 className={`text-2xl font-bold mb-4 ${username === 'Excesive' ? 'text-red-600' : username === 'Neretva' ? 'text-purple-400' : 'text-blue-600'}`}>{username}</h2>
    <div className="flex mt-4 flex-wrap gap-4 justify-center">
      {Object.keys(roles).map(role => (
        <img key={role} className="object-contain rounded" src={roles[role]} alt={role} />
      ))}
    </div>
  </div>
);

TeamSection.propTypes = {
  username: PropTypes.string.isRequired,
  roles: PropTypes.objectOf(PropTypes.string).isRequired
};

export default TeamSection;