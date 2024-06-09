//sistaleforo-web-final/app/page.jsx
'use client';

import React from 'react';
import ArticulosList from '../components/ArticulosList';
import MainLayout from '../components/layout/MainLayout';


export default function Index() {
  return (
    <MainLayout>
      <ArticulosList/>
    </MainLayout>    
  );
}
