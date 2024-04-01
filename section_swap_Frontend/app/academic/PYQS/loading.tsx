"use client"
import CustomLoading from '@/components/CustomLoading'
import { CircularProgress } from '@mui/material'
import React from 'react'

const loading = () => {
  return <CustomLoading loadingMessage='PYQS/NOTES' />
}

export default loading