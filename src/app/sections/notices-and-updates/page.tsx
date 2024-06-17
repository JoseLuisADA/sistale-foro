'use client'
import React from 'react';
import ArticulosList from '../../../components/ArticulosList';
import MainLayout from '../../../components/layout/MainLayout';

const NoticesAndUpdatesPage = () => {
  return (
    <MainLayout>
        <div className="container mx-auto mt-10 bg-white p-5 rounded shadow">
            <div className="p-5 bg-white rounded shadow-md mt-6 hover:bg-blue-100">
                <div className='flex '>
                    <img
                    className='object-contain rounded-full absolute' 
                    src="https://i.ibb.co/YWDBc74/1218.png"></img>
                    <h1 className="text-3xl font-bold mb-4 ml-12">Noticias y actualizaciones</h1>
                </div>
                <ArticulosList categoria="noticias" />
            </div>
        </div>
    </MainLayout>
  );
};

export default NoticesAndUpdatesPage;
