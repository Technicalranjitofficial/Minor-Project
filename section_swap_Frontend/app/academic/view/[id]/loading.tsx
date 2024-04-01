"use client"
import CustomLoading from '@/components/CustomLoading'
import { CircularProgress } from '@mui/material'
import React from 'react'

const loading = () => {
  return <CustomLoading loadingMessage='notes/pyqs' />
}

export default loading