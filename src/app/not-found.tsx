"use client"
import MainLayout from "../components/layout/MainLayout";
import React from 'react'

export default function NotFound() {
  return (
    <MainLayout>
        <div className='flex justify-center mt-14'>
        <h1 className='text-5xl'>404 PÁGINA NO ENCONTRADA</h1>
        <img className='w-80 mt-14' src='https://i.ibb.co/XV0qHmz/DALL-E-2024-06-09-14-31-31-Create-an-image-of-a-cartoon-turtle-with-the-body-of-a-muscular-man-The-t.png'>
        </img>
        </div>
    </MainLayout>
  )
}