'use client';
// src/components/OpenEditArticuloModalButton.tsx
import React from 'react';
import PropTypes from 'prop-types';

const OpenEditArticuloModalButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold ml-2 py-1 px-4 rounded"
    >
      Editar Artículo
    </button>
  );
};

OpenEditArticuloModalButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default OpenEditArticuloModalButton;
