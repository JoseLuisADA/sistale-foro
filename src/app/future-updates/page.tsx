'use client'
// src/app/future-updates/page.tsx
import { futureUpdates } from '../../components/constants/futureUpdates';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

const FutureUpdates = () => {
  
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Futuras Actualizaciones</h1>
          <div className="space-y-4">
            {futureUpdates.map((update, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
                <div className='flex'>
                  <img className='mr-3' src="https://nosapki.com/images/icons/1388.png"></img>
                  <h2 className="text-2xl font-semibold">{update.title}</h2>
                </div>
                <p className="mt-2">{update.description}</p>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    );
  }
  
  export default FutureUpdates;