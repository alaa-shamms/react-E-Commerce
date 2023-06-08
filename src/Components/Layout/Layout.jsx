import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout({userData,logout}) {
  return <>
  <Navbar logout={logout} userData={userData} />
  {/* children of Layout */}
  <Outlet/>
  </>
}
