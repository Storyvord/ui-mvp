"use client"
import { userLogout } from '@/lib/api/api'
import React from 'react'
import { Button } from '../ui/button'

const LogoutButton = () => {
  return (
    <Button onClick={() => userLogout()}>Logout</Button>
  )
}

export default LogoutButton