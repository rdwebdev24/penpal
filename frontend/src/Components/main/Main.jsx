import React from 'react'
import { Outlet } from 'react-router-dom'
import { MainNav } from './MainNav'
import { Notes } from './Notes'
import { SideBar } from './SideBar'
import '../../css/main.css'
export const Main = () => {
  return (
    <main>
        <MainNav/>
        <section className='main-app'>
            <SideBar/>
            <Outlet/>
        </section>
    </main>
  )
}
