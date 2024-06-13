//sistaleforo-web-final/app/page.jsx
'use client';

import React from 'react';
import CreateArticuloForm from "../../components/CreateArticuloForm";
import { useUserContext } from '../../context/UserContext'
import MainLayout from '../../components/layout/MainLayout';



export default function Index() {
    const { user } = useUserContext()   
  return (
    <MainLayout>
      <CreateArticuloForm username={user.username} token={user.token} />
    </MainLayout>
  );
}
