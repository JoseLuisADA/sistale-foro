"use client"
import MainLayout from "../components/layout/MainLayout";
import React from 'react'

export default function NotFound() {
  return (
    <MainLayout>
        <div className='flex justify-center mt-14'>
        <h1 className='min-[375px]:text-xl min-[375px]:ml-14 min-[1280px]:text-5xl'>404 PÁGINA NO ENCONTRADA</h1>
        <img className='min-[375px]:w-40 min-[375px]:mr-11 min-[1280px]:w-80 mt-14 ' src='https://i.ibb.co/XV0qHmz/DALL-E-2024-06-09-14-31-31-Create-an-image-of-a-cartoon-turtle-with-the-body-of-a-muscular-man-The-t.png'>
        </img>
        </div>
    </MainLayout>
  )
}