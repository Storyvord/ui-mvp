"use client"
import { userLogout } from '@/lib/api/api'
import React from 'react'

const LogoutButton = () => {
  return (
    <p className='text-center mx-auto cursor-pointer' onClick={() => userLogout()}>Logout</p>
  )
}

export default LogoutButton